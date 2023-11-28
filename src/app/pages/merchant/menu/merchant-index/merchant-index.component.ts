import { Component } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from "ng-apexcharts"
import { lastValueFrom } from "rxjs"
import {
  MyMerchantStatistic,
  getTopProduct,
} from "src/app/interface/globalInterface"
import { ApiService } from "src/app/service/api.service"

export type ChartOptions = {
  series: ApexAxisChartSeries
  chart: ApexChart
  xaxis: ApexXAxis
  stroke: ApexStroke
  dataLabels: ApexDataLabels
  plotOptions: ApexPlotOptions
  yaxis: ApexYAxis
  tooltip: ApexTooltip
  colors: string[]
  title: ApexTitleSubtitle
  subtitle: ApexTitleSubtitle
}

@Component({
  selector: "app-merchant-index",
  templateUrl: "./merchant-index.component.html",
  styleUrl: "./merchant-index.component.css",
})
export class MerchantIndexComponent {
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.fetchMerchantStatistic()
    this.fetchTop5Product()
  }

  mySatistic: MyMerchantStatistic | undefined
  async fetchMerchantStatistic() {
    try {
      const res = await lastValueFrom(this.apiService.getMyMerchantStatistic())
      console.log("My Merchant Statistic", res)
      this.mySatistic = res
    } catch (error) {
      console.log("My Merchant Statistic", error)
    }
  }

  top5Product: getTopProduct[] | undefined
  async fetchTop5Product() {
    try {
      const res = await lastValueFrom(this.apiService.getTop5Product())
      console.log("Top 5 Product", res)
      this.top5Product = res
      this.chartOptions.series = [
        {
          data: res.map((product) => product.product_sold),
        },
      ]
      this.chartOptions.xaxis = {
        categories: res.map((product) => product.name),
      }
    } catch (error) {
      console.log("Top 5 Product", error)
    }
  }

  public chartOptions: Partial<ChartOptions> = {
    series: [
      {
        data: [],
      },
    ],
    chart: {
      type: "bar",
      height: 380,
    },
    plotOptions: {
      bar: {
        barHeight: "100%",
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: "bottom",
        },
      },
    },
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      style: {
        colors: ["#000"],
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
      },
      offsetX: 0,
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    title: {
      text: "Top 5 Products",
      align: "center",
      floating: true,
    },
    subtitle: {
      text: "Top 5 Products Sold by Merchant and Product Name",
      align: "center",
    },
    tooltip: {
      theme: "dark",
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return ""
          },
        },
      },
    },
  }

  sortByForm: FormGroup = this.fb.group({
    ascending: ["asc", [Validators.required]],
    sort_by: ["-1", [Validators.required]],
  })

  // sorting start
  sortTop5Products() {
    const sortingFunction = this.getSortingFunction()
    return this.top5Product ? this.top5Product.sort(sortingFunction) : false
  }

  // Function to generate sorting function based on option
  getSortingFunction() {
    const option = this.sortByForm.controls["sort_by"].value
    const ascending = this.sortByForm.controls["ascending"].value
    switch (option) {
      case "name":
        return (a: { name: string }, b: { name: any }) =>
          ascending === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
      case "sales":
        return (a: { product_sold: number }, b: { product_sold: number }) =>
          ascending === "asc"
            ? a.product_sold - b.product_sold
            : b.product_sold - a.product_sold
      case "price":
        return (a: getTopProduct, b: getTopProduct) => {
          const buyingPowerDiff =
            this.calculateBuyingPower(a) - this.calculateBuyingPower(b)
          return ascending === "asc" ? buyingPowerDiff : -buyingPowerDiff
        }
      case "amount_sold":
        return (a: { amount_sold: number }, b: { amount_sold: number }) =>
          ascending === "asc"
            ? a.amount_sold - b.amount_sold
            : b.amount_sold - a.amount_sold
      default:
        return (a: { product_sold: number }, b: { product_sold: number }) =>
          b.product_sold - a.product_sold
    }
  }

  calculateBuyingPower(product: getTopProduct): number {
    const price = product.price
    const productSold = product.product_sold

    if (productSold > 0) {
      // if product is sold, then buying power is price * productSold
      return price * productSold
    } else {
      // if product is not sold, then buying power is price
      return 0
    }
  }
}

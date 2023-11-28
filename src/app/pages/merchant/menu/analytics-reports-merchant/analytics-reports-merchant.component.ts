import { Component } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Title } from "@angular/platform-browser"
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexStroke,
  ApexPlotOptions,
  ApexDataLabels,
  ApexYAxis,
  ApexTooltip,
  ChartComponent,
} from "ng-apexcharts"
import { lastValueFrom } from "rxjs"
import {
  MerchantApprovedName,
  getTopProduct,
} from "src/app/interface/globalInterface"
import { ApiService } from "src/app/service/api.service"
import { SwalService } from "src/app/service/swal.service"

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
  selector: "app-analytics-reports-merchant",
  templateUrl: "./analytics-reports-merchant.component.html",
})
export class AnalyticsReportsMerchantComponent {
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private Swal: SwalService,
    private titleService: Title,
  ) {
    this.titleService.setTitle("Analytics Reports | Promo Tourism System")
  }

  ngOnInit() {
    this.fetchTopProducts()
  }

  topProducts: getTopProduct[] | undefined
  isFetching = false
  async fetchTopProducts() {
    this.isFetching = true
    try {
      const res = await lastValueFrom(this.apiService.getProductAnalytics())
      console.log("Top Products", res)
      this.topProducts = res

      // update chart
      this.chartOptions.series = [
        {
          name: "Amount Sold",
          data: res.map((product) => product.amount_sold),
        },
      ]
      this.chartOptions.xaxis = {
        categories: this.topProducts.map((product) => product.name),
      }
    } catch (error) {
      console.log(error)
      this.Swal.SwalNotif("Error", "Failed to fetch data")
    }
    this.isFetching = false
  }

  // sorting start
  sortByForm: FormGroup = this.fb.group({
    ascending: ["asc", [Validators.required]],
    sort_by: ["-1", [Validators.required]],
  })
  sortTopProducts() {
    const sortingFunction = this.getSortingFunction()
    return this.topProducts ? this.topProducts.sort(sortingFunction) : false
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

  public chartOptions: Partial<ChartOptions> = {
    series: [
      {
        data: [],
      },
    ],
    chart: {
      type: "bar",
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
      text: "Top Selling",
      align: "center",
      floating: true,
    },
    subtitle: {
      text: "Top Products Sold by Merchant and Product Name",
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
}

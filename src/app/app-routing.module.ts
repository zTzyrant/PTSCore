import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { HomeComponent } from "./pages/home/home.component"
import { AboutComponent } from "./pages/menu/about/about.component"
import { RegisterMerchantComponent } from "./pages/merchant/register-merchant/register-merchant.component"
import { NotfoundComponent } from "./pages/error/notfound/notfound.component"
import { LoginMinistryComponent } from "./pages/ministry/login-ministry/login-ministry.component"
import { ContactComponent } from "./pages/menu/contact/contact.component"
import { LoginMerchantComponent } from "./pages/merchant/login-merchant/login-merchant.component"
import { MinistryIndexComponent } from "./pages/ministry/menu/ministry-index/ministry-index.component"
import { MinistryManageMerchantComponent } from "./pages/ministry/menu/manage-merchant/manage-merchant.component"
import { ViewMerchantComponent } from "./pages/ministry/menu/view-merchant/view-merchant.component"
import { MinistryGuard, MinistryLoginGuard } from "./helpers/ministry.guard"
import { MerchantIndexComponent } from "./pages/merchant/menu/merchant-index/merchant-index.component"
import { MerchantProductsComponent } from "./pages/merchant/menu/merchant-products/merchant-products.component"
import { MerchantOrdersComponent } from "./pages/merchant/menu/merchant-orders/merchant-orders.component"
import { ViewOrdersComponent } from "./pages/merchant/menu/view-orders/view-orders.component"
import { ManageMerchantComponent } from "./pages/merchant/menu/manage-merchant/manage-merchant.component"
import { FirstLoginComponent } from "./pages/merchant/first-login/first-login.component"
import {
  MerchantFirstLoginGuard,
  MerchantGuard,
  MerchantLoginGuard,
} from "./helpers/merchant.guard"
import { CreateProductComponent } from "./pages/merchant/menu/create-product/create-product.component"
import { ViewProductsComponent } from "./pages/merchant/menu/view-products/view-products.component"
import { ProductsComponent } from "./pages/menu/products/products.component"
import { ViewProductComponent } from "./pages/menu/view-product/view-product.component"
import { RegisterCustomerComponent } from "./pages/customer/register-customer/register-customer.component"
import { ProfileCustomerComponent } from "./pages/customer/profile-customer/profile-customer.component"
import { RecentOrdersComponent } from "./pages/customer/recent-orders/recent-orders.component"
import { ViewInvoiceComponent } from "./pages/customer/view-invoice/view-invoice.component"
import { OrdersReviewComponent } from "./pages/customer/orders-review/orders-review.component"
import { customerGuard } from "./helpers/customer.guard"
import { AnalyticsReportsMinstryComponent } from "./pages/ministry/menu/analytics-reports-ministry/analytics-reports-ministry.component"
import { AnalyticsReportsMerchantComponent } from "./pages/merchant/menu/analytics-reports-merchant/analytics-reports-merchant.component"

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  {
    path: "products",
    component: ProductsComponent,
    pathMatch: "full",
  },
  {
    path: "products/:id",
    component: ViewProductComponent,
    pathMatch: "full",
  },

  // Merchant routes start
  { path: "merchant/register", component: RegisterMerchantComponent },
  {
    path: "merchant/login",
    component: LoginMerchantComponent,
    canActivate: [MerchantLoginGuard],
  },
  {
    path: "merchant",
    component: MerchantIndexComponent,
    canActivate: [MerchantGuard],
  },
  {
    path: "merchant/products",
    component: MerchantProductsComponent,
    canActivate: [MerchantGuard],
  },
  {
    path: "merchant/products/:id",
    component: ViewProductsComponent,
    canActivate: [MerchantGuard],
  },
  {
    path: "merchant/create-product",
    component: CreateProductComponent,
    canActivate: [MerchantGuard],
  },
  {
    path: "merchant/orders",
    component: MerchantOrdersComponent,
    canActivate: [MerchantGuard],
  },
  {
    path: "merchant/orders/:id",
    component: ViewOrdersComponent,
    canActivate: [MerchantGuard],
  },
  {
    path: "merchant/manage-merchant",
    component: ManageMerchantComponent,
    canActivate: [MerchantGuard],
  },
  {
    path: "merchant/first-login",
    component: FirstLoginComponent,
    canActivate: [MerchantFirstLoginGuard],
  },
  {
    path: "merchant/analytics-reports",
    component: AnalyticsReportsMerchantComponent,
    canActivate: [MerchantGuard],
  },
  // Merchant routes end

  // Ministry routes start
  {
    path: "ministry/login",
    component: LoginMinistryComponent,
    canActivate: [MinistryLoginGuard],
  },
  {
    path: "ministry",
    component: MinistryIndexComponent,
    canActivate: [MinistryGuard],
  },
  {
    path: "ministry/manage-merchant",
    component: MinistryManageMerchantComponent,
    canActivate: [MinistryGuard],
  },
  {
    path: "ministry/manage-merchant/:id",
    component: ViewMerchantComponent,
    canActivate: [MinistryGuard],
  },
  {
    path: "ministry/analytics-reports",
    component: AnalyticsReportsMinstryComponent,
    canActivate: [MinistryGuard],
  },
  // Ministry routes end

  // Customer routes start
  {
    path: "customer/register",
    component: RegisterCustomerComponent,
  },
  {
    path: "profile",
    component: ProfileCustomerComponent,
    canActivate: [customerGuard],
  },
  {
    path: "orders",
    component: RecentOrdersComponent,
    canActivate: [customerGuard],
  },
  {
    path: "view-invoice/:id",
    component: ViewInvoiceComponent,
  },
  {
    path: "review-orders",
    component: OrdersReviewComponent,
    canActivate: [customerGuard],
  },
  // Customer routes end

  { path: "contact", component: ContactComponent },

  { path: "**", component: NotfoundComponent },
  { path: "404", component: NotfoundComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "disabled" }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

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
import { ManageMerchantsComponent } from "./pages/ministry/menu/manage-merchant/manage-merchant.component"
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

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },

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
    component: ManageMerchantsComponent,
    canActivate: [MinistryGuard],
  },
  {
    path: "ministry/manage-merchant/:id",
    component: ViewMerchantComponent,
    canActivate: [MinistryGuard],
  },
  // Ministry routes end

  { path: "contact", component: ContactComponent },

  { path: "**", component: NotfoundComponent },
  { path: "404", component: NotfoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

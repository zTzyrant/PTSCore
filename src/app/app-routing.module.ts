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
import { ManageMerchantComponent } from "./pages/ministry/menu/manage-merchant/manage-merchant.component"
import { ViewMerchantComponent } from "./pages/ministry/menu/view-merchant/view-merchant.component"

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "merchant/register", component: RegisterMerchantComponent },
  { path: "merchant/login", component: LoginMerchantComponent },
  { path: "ministry/login", component: LoginMinistryComponent },
  { path: "ministry", component: MinistryIndexComponent },
  { path: "ministry/manage-merchant", component: ManageMerchantComponent },
  { path: "ministry/manage-merchant/:id", component: ViewMerchantComponent },
  { path: "contact", component: ContactComponent },

  { path: "**", component: NotfoundComponent },
  { path: "404", component: NotfoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

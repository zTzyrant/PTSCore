import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { HomeComponent } from "./pages/home/home.component"
import { AboutComponent } from "./pages/menu/about/about.component"
import { RegisterMerchantComponent } from "./pages/merchant/register-merchant/register-merchant.component"
import { NotfoundComponent } from "./pages/error/notfound/notfound.component"
import { LoginMinistryComponent } from "./pages/ministry/login-ministry/login-ministry.component"
import { ContactComponent } from "./pages/menu/contact/contact.component"
import { LoginMerchantComponent } from "./pages/merchant/login-merchant/login-merchant.component"

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "merchant/register", component: RegisterMerchantComponent },
  { path: "merchant/login", component: LoginMerchantComponent },
  { path: "ministry/login", component: LoginMinistryComponent },
  { path: "contact", component: ContactComponent },

  { path: "**", component: NotfoundComponent },
  { path: "404", component: NotfoundComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { NavbarComponent } from "./component/navbar/navbar.component"
import { HomeComponent } from "./pages/home/home.component"
import { AboutComponent } from "./pages/menu/about/about.component";
import { RegisterMerchantComponent } from './pages/menu/merchant/register-merchant/register-merchant.component';
import { NotfoundComponent } from './pages/error/notfound/notfound.component';
import { TopActivitiesComponent } from './component/content/top-activities/top-activities.component'

@NgModule({
  declarations: [AppComponent, NavbarComponent, HomeComponent, AboutComponent, RegisterMerchantComponent, NotfoundComponent, TopActivitiesComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

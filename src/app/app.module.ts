import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { NavbarComponent } from "./component/navbar/navbar.component"
import { HomeComponent } from "./pages/home/home.component"
import { AboutComponent } from "./pages/menu/about/about.component"
import { RegisterMerchantComponent } from "./pages/merchant/register-merchant/register-merchant.component"
import { NotfoundComponent } from "./pages/error/notfound/notfound.component"
import { TopActivitiesComponent } from "./component/content/top-activities/top-activities.component"
import { TripPlanComponent } from "./component/content/trip-plan/trip-plan.component"
import { RecentlyAddedSliderComponent } from "./component/content/recently-added-slider/recently-added-slider.component"
import { FooterComponent } from "./component/footer/footer.component"
import { HttpClientModule } from "@angular/common/http"
import { CardComponent } from "./component/skeleton/card/card.component"
import { ReactiveFormsModule } from "@angular/forms"
import { RegisterMerchantFormComponent } from "./component/form/register-merchant-form/register-merchant-form.component"
import { LoginMinistryComponent } from "./pages/ministry/login-ministry/login-ministry.component"
import { LoginMinistryFormComponent } from "./component/form/login-ministry-form/login-ministry-form.component"
import { ContactComponent } from "./pages/menu/contact/contact.component"
import { LoginMerchantComponent } from "./pages/merchant/login-merchant/login-merchant.component"
import { LoginMerchantFormComponent } from "./component/form/login-merchant-form/login-merchant-form.component"
import { MinistryIndexComponent } from "./pages/ministry/menu/ministry-index/ministry-index.component"
import { MenuMinistryComponent } from "./component/sidebar/menu-ministry/menu-ministry.component"
import { MenuMerchantComponent } from "./component/sidebar/menu-merchant/menu-merchant.component"
import { ManageMerchantComponent } from "./pages/ministry/menu/manage-merchant/manage-merchant.component"
import { IndexMinistryContentComponent } from "./component/content/ministry/index-ministry-content/index-ministry-content.component"
import { ManageMerchantMinistryContentComponent } from "./component/content/ministry/manage-merchant-ministry-content/manage-merchant-ministry-content.component"
import { TopnavMinistryComponent } from "./component/topnav/ministry/topnav-ministry.component"
import { ViewMerchantComponent } from "./pages/ministry/menu/view-merchant/view-merchant.component"
import { ViewMerchantMinistryContentComponent } from "./component/content/ministry/view-merchant-ministry-content/view-merchant-ministry-content.component"
import { DashboardMinistryComponent } from "./layout/dashboard-ministry/dashboard-ministry.component"

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    RegisterMerchantComponent,
    NotfoundComponent,
    TopActivitiesComponent,
    TripPlanComponent,
    RecentlyAddedSliderComponent,
    FooterComponent,
    CardComponent,
    RegisterMerchantFormComponent,
    LoginMinistryComponent,
    LoginMinistryFormComponent,
    ContactComponent,
    LoginMerchantComponent,
    LoginMerchantFormComponent,
    MinistryIndexComponent,
    MenuMinistryComponent,
    MenuMerchantComponent,
    ManageMerchantComponent,
    IndexMinistryContentComponent,
    ManageMerchantMinistryContentComponent,
    TopnavMinistryComponent,
    ViewMerchantComponent,
    ViewMerchantMinistryContentComponent,
    DashboardMinistryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

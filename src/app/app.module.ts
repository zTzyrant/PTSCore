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
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"
import { CardComponent } from "./component/skeleton/card/card.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RegisterMerchantFormComponent } from "./component/form/register-merchant-form/register-merchant-form.component"
import { LoginMinistryComponent } from "./pages/ministry/login-ministry/login-ministry.component"
import { LoginMinistryFormComponent } from "./component/form/login-ministry-form/login-ministry-form.component"
import { ContactComponent } from "./pages/menu/contact/contact.component"
import { LoginMerchantComponent } from "./pages/merchant/login-merchant/login-merchant.component"
import { LoginMerchantFormComponent } from "./component/form/login-merchant-form/login-merchant-form.component"
import { MinistryIndexComponent } from "./pages/ministry/menu/ministry-index/ministry-index.component"
import { MenuMinistryComponent } from "./component/sidebar/menu-ministry/menu-ministry.component"
import { MenuMerchantComponent } from "./component/sidebar/menu-merchant/menu-merchant.component"
import { MinistryManageMerchantComponent } from "./pages/ministry/menu/manage-merchant/manage-merchant.component"
import { IndexMinistryContentComponent } from "./component/content/ministry/index-ministry-content/index-ministry-content.component"
import { ManageMerchantMinistryContentComponent } from "./component/content/ministry/manage-merchant-ministry-content/manage-merchant-ministry-content.component"
import { TopnavMinistryComponent } from "./component/topnav/ministry/topnav-ministry.component"
import { ViewMerchantComponent } from "./pages/ministry/menu/view-merchant/view-merchant.component"
import { ViewMerchantMinistryContentComponent } from "./component/content/ministry/view-merchant-ministry-content/view-merchant-ministry-content.component"
import { DashboardMinistryComponent } from "./layout/dashboard-ministry/dashboard-ministry.component"
import { authInterceptor } from "./service/auth.interceptor"
import { DashboardMerchantComponent } from "./layout/dashboard-merchant/dashboard-merchant.component"
import { NgxTippyModule } from "ngx-tippy-wrapper"
import { MerchantIndexComponent } from "./pages/merchant/menu/merchant-index/merchant-index.component"
import { MerchantProductsComponent } from "./pages/merchant/menu/merchant-products/merchant-products.component"
import { ViewProductsComponent } from "./pages/merchant/menu/view-products/view-products.component"
import { TopnavMerchantComponent } from "./component/topnav/merchant/topnav-merchant/topnav-merchant.component"
import { MerchantOrdersComponent } from "./pages/merchant/menu/merchant-orders/merchant-orders.component"
import { ViewOrdersComponent } from "./pages/merchant/menu/view-orders/view-orders.component"
import { ManageMerchantComponent } from "./pages/merchant/menu/manage-merchant/manage-merchant.component"
import { MerchantAccountComponent } from "./component/sidecontent/merchant-account/merchant-account.component"
import { FirstLoginComponent } from "./pages/merchant/first-login/first-login.component"
import { CreateProductComponent } from "./pages/merchant/menu/create-product/create-product.component"
import { NgSelectModule } from "@ng-select/ng-select"
import { AddEditProductsComponent } from "./component/form/add-edit-products/add-edit-products.component"
import { ProductsComponent } from "./pages/menu/products/products.component"
import { MainComponent } from "./layout/main/main.component"
import { ViewProductComponent } from "./pages/menu/view-product/view-product.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { RegisterCustomerComponent } from "./pages/customer/register-customer/register-customer.component"
import { RegisterCustomerFormComponent } from "./component/form/register-customer-form/register-customer-form.component"
import { LoginCustomerFormComponent } from "./component/form/login-customer-form/login-customer-form.component"
import { FlatpickrModule } from "angularx-flatpickr"
import { ProfileCustomerComponent } from "./pages/customer/profile-customer/profile-customer.component"
import { RecentOrdersComponent } from "./pages/customer/recent-orders/recent-orders.component"
import { MenuCustomerComponent } from "./component/sidebar/menu-customer/menu-customer.component"
import { DashboardCustomerComponent } from "./layout/dashboard-customer/dashboard-customer.component"
import { ViewInvoiceComponent } from "./pages/customer/view-invoice/view-invoice.component"
import { OrdersReviewComponent } from "./pages/customer/orders-review/orders-review.component"
import { NgApexchartsModule } from "ng-apexcharts"
import { AnalyticsReportsMinstryComponent } from "./pages/ministry/menu/analytics-reports-ministry/analytics-reports-ministry.component"
import { AnalyticsReportsMerchantComponent } from "./pages/merchant/menu/analytics-reports-merchant/analytics-reports-merchant.component";
import { ViewProductsSkeletonComponent } from './component/skeleton/view-products-skeleton/view-products-skeleton.component';
import { MerchantProfileComponent } from './pages/merchant/menu/merchant-profile/merchant-profile.component';
import { MinistryProfileComponent } from './pages/ministry/menu/ministry-profile/ministry-profile.component'

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
    MinistryManageMerchantComponent,
    IndexMinistryContentComponent,
    ManageMerchantMinistryContentComponent,
    TopnavMinistryComponent,
    ViewMerchantComponent,
    ViewMerchantMinistryContentComponent,
    DashboardMinistryComponent,
    DashboardMerchantComponent,
    MerchantIndexComponent,
    MerchantProductsComponent,
    ViewProductsComponent,
    TopnavMerchantComponent,
    MerchantOrdersComponent,
    ViewOrdersComponent,
    ManageMerchantComponent,
    MerchantAccountComponent,
    FirstLoginComponent,
    CreateProductComponent,
    AddEditProductsComponent,
    ProductsComponent,
    MainComponent,
    ViewProductComponent,
    RegisterCustomerComponent,
    RegisterCustomerFormComponent,
    LoginCustomerFormComponent,
    ProfileCustomerComponent,
    RecentOrdersComponent,
    MenuCustomerComponent,
    DashboardCustomerComponent,
    ViewInvoiceComponent,
    OrdersReviewComponent,
    AnalyticsReportsMinstryComponent,
    AnalyticsReportsMerchantComponent,
    ViewProductsSkeletonComponent,
    MerchantProfileComponent,
    MinistryProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxTippyModule,
    NgSelectModule,
    FormsModule,
    BrowserAnimationsModule,
    FlatpickrModule.forRoot(),
    NgApexchartsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: authInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

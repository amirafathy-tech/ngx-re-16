import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { CityComponent } from './city/city.component';
import { CompanyComponent } from './company/company.component';
import { SharedModule } from './shared/shared.module';
import { CityEditComponent } from './city/city-edit/city-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BuildingTypeComponent } from './building-type/building-type.component';
import { BuildingTypeEditComponent } from './building-type/building-type-edit/building-type-edit.component';
import { ProfitComponent } from './profit/profit.component';
import { ProfitEditComponent } from './profit/profit-edit/profit-edit.component';
import { CurrencyComponent } from './currency/currency.component';
import { CurrencyEditComponent } from './currency/currency-edit/currency-edit.component';
import { MethodOfCalcComponent } from './method-of-calc/method-of-calc.component';
import { MethodOfCalcEditComponent } from './method-of-calc/method-of-calc-edit/method-of-calc-edit.component';
import { PriceTypeComponent } from './price-type/price-type.component';
import { PriceTypeEditComponent } from './price-type/price-type-edit/price-type-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { UnitComponent } from './unit/unit.component';
import { UnitOrientationComponent } from './unit/unit-orientation/unit-orientation.component';
import { UnitOrientationEditComponent } from './unit/unit-orientation/unit-orientation-edit/unit-orientation-edit.component';
import { UnitFixtureComponent } from './unit/unit-fixture/unit-fixture.component';
import { UnitFixtureEditComponent } from './unit/unit-fixture/unit-fixture-edit/unit-fixture-edit.component';
import { UnitStatusComponent } from './unit/unit-status/unit-status.component';
import { UnitStatusEditComponent } from './unit/unit-status/unit-status-edit/unit-status-edit.component';
import { UnitViewComponent } from './unit/unit-view/unit-view.component';
import { UnitViewEditComponent } from './unit/unit-view/unit-view-edit/unit-view-edit.component';
import { UsageTypeComponent } from './unit/usage-type/usage-type.component';
import { UsageTypeEditComponent } from './unit/usage-type/usage-type-edit/usage-type-edit.component';
import { UnitSubTypeComponent } from './unit/unit-sub-type/unit-sub-type.component';
import { UnitSubTypeEditComponent } from './unit/unit-sub-type/unit-sub-type-edit/unit-sub-type-edit.component';
import { UnitFloorComponent } from './unit/unit-floor/unit-floor.component';
import { UnitFloorEditComponent } from './unit/unit-floor/unit-floor-edit/unit-floor-edit.component';
import { UnitOfMeasureComponent } from './unit/unit-of-measure/unit-of-measure.component';
import { UnitOfMeasureEditComponent } from './unit/unit-of-measure/unit-of-measure-edit/unit-of-measure-edit.component';
import { UnitListComponent } from './unit/unit-list/unit-list.component';
import { BuildingComponent } from './building/building.component';
import { BuildingListComponent } from './building/building-list/building-list.component';
import { ProjectComponent } from './project/project.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { ProjectAreaComponent } from './project/project-area/project-area.component';
import { ProjectAreaEditComponent } from './project/project-area/project-area-edit/project-area-edit.component';
import { BuildingAreaComponent } from './building/building-area/building-area.component';
import { BuildingAreaEditComponent } from './building/building-area/building-area-edit/building-area-edit.component';
import { UnitAreaComponent } from './unit/unit-area/unit-area.component';
import { UnitAreaEditComponent } from './unit/unit-area/unit-area-edit/unit-area-edit.component';
import { AreaComponent } from './area/area.component';
import { AreaListComponent } from './area/area-list/area-list.component';
import { PaymentComponent } from './payment/payment.component';
import { ShellbarSidebarComponent } from './shellbar/shellbar.component';
import { CommonModule } from '@angular/common';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ModelComponent } from './model/model.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    DropdownDirective,
    LoadingSpinnerComponent,
    CityComponent,
    CompanyComponent,
    CityEditComponent,
    BuildingTypeComponent,
    BuildingTypeEditComponent,
    ProfitComponent,
    ProfitEditComponent,
    CurrencyComponent,
    CurrencyEditComponent,
    MethodOfCalcComponent,
    MethodOfCalcEditComponent,
    PriceTypeComponent,
    PriceTypeEditComponent,
    UnitComponent,
    UnitOrientationComponent,
    UnitOrientationEditComponent,
    UnitFixtureComponent,
    UnitFixtureEditComponent,
    UnitStatusComponent,
    UnitStatusEditComponent,
    UnitViewComponent,
    UnitViewEditComponent,
    UsageTypeComponent,
    UsageTypeEditComponent,
    UnitSubTypeComponent,
    UnitSubTypeEditComponent,
    UnitFloorComponent,
    UnitFloorEditComponent,
    UnitOfMeasureComponent,
    UnitOfMeasureEditComponent,
    UnitListComponent,
    BuildingComponent,
    BuildingListComponent,
    ProjectComponent,
    ProjectListComponent,
    CompanyEditComponent,
    ProjectAreaComponent,
    ProjectAreaEditComponent,
    BuildingAreaComponent,
    BuildingAreaEditComponent,
    UnitAreaComponent,
    UnitAreaEditComponent,
    AreaComponent,
    AreaListComponent,
    PaymentComponent,
    ModelComponent,
    ShellbarSidebarComponent,
    AboutComponent,
    FooterComponent
  ],

  imports: [
    FundamentalNgxCoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    CommonModule,
    NgHttpLoaderModule.forRoot(),
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';

import { ColorComponent } from './components/colorComponents/color/color.component';
import { CarComponent } from './components/carComponents/car/car.component';
import { CarDetailComponent } from './components/carComponents/car-detail/car-detail.component';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { FilterComponent } from './components/filter/filter.component';
import { RentalComponent } from './components/rental/rental.component';
import { PaymentComponent } from './components/payment/payment.component';

import{ToastrModule} from "ngx-toastr";
import { BrandAddComponent } from './components/brandComponents/brand-add/brand-add.component';
import { ColorAddComponent } from './components/colorComponents/color-add/color-add.component';
import { CarAddComponent } from './components/carComponents/car-add/car-add.component';
import { BrandUpdateComponent } from './components/brandComponents/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/colorComponents/color-update/color-update.component';
import { CarUpdateComponent } from './components/carComponents/car-update/car-update.component';
import { BrandComponent } from './components/brandComponents/brand/brand.component';




@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    BrandComponent,
    ColorComponent,
    CarComponent,
    CarDetailComponent,
    ColorFilterPipe,
    BrandFilterPipe,
    FilterComponent,
    RentalComponent,
    PaymentComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    BrandUpdateComponent,
    ColorUpdateComponent,
    CarUpdateComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({ 
      positionClass:"toast-bottom-right"
    }),
    BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

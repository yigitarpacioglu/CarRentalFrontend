import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { FilterComponent } from './components/filter/filter.component';
import { RentalComponent } from './components/rental/rental.component';
import { PaymentComponent } from './components/payment/payment.component';




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
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

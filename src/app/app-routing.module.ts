import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brandComponents/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brandComponents/brand-update/brand-update.component';
import { CarAddComponent } from './components/carComponents/car-add/car-add.component';
import { CarDetailComponent } from './components/carComponents/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/carComponents/car-update/car-update.component';
import { CarComponent } from './components/carComponents/car/car.component';
import { ColorAddComponent } from './components/colorComponents/color-add/color-add.component';
import { ColorUpdateComponent } from './components/colorComponents/color-update/color-update.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/userComponents/register/register.component';
import { LoginComponent } from './components/userComponents/login/login.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/filter/:brandId/:colorId",component:CarComponent},
  {path:"cars/details/:carId",component:CarDetailComponent},
  {path:"payment/:rentalSummary",component:PaymentComponent},
  {path:"brands/add",component:BrandAddComponent},
  {path:"colors/add",component:ColorAddComponent},
  {path:"cars/add",component:CarAddComponent},
  {path:"brands/update/:brandId",component:BrandUpdateComponent},
  {path:"colors/update/:colorId",component:ColorUpdateComponent},
  {path:"cars/update/:carId",component:CarUpdateComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

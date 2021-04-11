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
import { ProfileComponent } from './components/userComponents/profile/profile.component';
import { CustomerFormComponent } from './components/userComponents/customer-form/customer-form.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/filter/:brandId/:colorId",component:CarComponent},
  {path:"cars/details/:carId",component:CarDetailComponent},
  {path:"payment/:rental",component:PaymentComponent, canActivate:[LoginGuard]},
  {path:"brands/add",component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:"colors/add",component:ColorAddComponent,canActivate:[LoginGuard]},
  {path:"cars/add",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"brands/update/:brandId",component:BrandUpdateComponent,canActivate:[LoginGuard]},
  {path:"colors/update/:colorId",component:ColorUpdateComponent,canActivate:[LoginGuard]},
  {path:"cars/update/:carId",component:CarUpdateComponent,canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"profile/:userId",component:ProfileComponent,canActivate:[LoginGuard]},
  {path:"customerForm/:carId",component:CustomerFormComponent,canActivate:[LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

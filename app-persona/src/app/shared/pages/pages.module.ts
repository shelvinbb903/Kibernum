import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomePage } from './home/home.page';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginComponent } from './login/login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { VehicleRegisterComponent } from './vehicle-register/vehicle-register.component';
import { ActiveUserComponent } from './active-user/active-user.component';


@NgModule({
  declarations: [HomePage, LoginComponent, UserRegisterComponent, VehicleRegisterComponent, ActiveUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { LoginComponent } from './login/login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { SessionGuard } from 'src/app/core/guards/session.guard';
import { LoginGuard } from 'src/app/core/guards/login.guard';
import { VehicleRegisterComponent } from './vehicle-register/vehicle-register.component';
import { ActiveUserComponent } from './active-user/active-user.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage, 
    canActivate: [SessionGuard]
  },
  {
    path: 'login',
    component: LoginComponent, 
    canActivate: [LoginGuard]
  },
  {
    path: 'register',
    component: UserRegisterComponent
  },
  {
    path: 'active',
    component: ActiveUserComponent, 
    canActivate: [SessionGuard]
  },
  {
    path: 'vehicle/register',
    component: VehicleRegisterComponent, 
    canActivate: [SessionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

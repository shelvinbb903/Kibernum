import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(private usersService: UsersService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    
    await this.usersService.loadDataSession();
    
    if(JSON.stringify(this.usersService.userDataSession) === '{}') {
      this.router.navigate(["users/login"])
      return false;  
    }
     
    return true;
  }
  
}

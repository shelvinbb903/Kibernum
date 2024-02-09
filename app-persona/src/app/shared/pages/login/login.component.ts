import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { AlertsService } from 'src/app/core/utils/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  userLogin:any = {
    email: "",
    password: ""
  }

  constructor(
    private router: Router, 
    private usersSer: UsersService,
    private alertsSer: AlertsService
  ) { }

  ngOnInit() {
    this.userLogin = {
      email: "",
      password: ""
    }
  }

  /**
   * Metodo para cargar la pagina principal y agregar mas productos
   */
  register = () => {
    this.router.navigateByUrl("users/register")
  }
  
  /**
   * Metodo para consumir el servicio rest de guardar los datos del pedido en la base de datos
   */
  login = async () => {
    await this.alertsSer.openLoading();

    const {error, data}:any = await this.usersSer.authenticate('api/login', this.userLogin)

    if(error) {   
      console.log("Error: ",data);   
      this.alertsSer.openAlert('Error', data);
      await this.alertsSer.closeLoading();
      return;
    }

    await this.usersSer.saveDataSession(data);      
    await this.alertsSer.closeLoading();

    if(data.status_id == 1){
      this.router.navigateByUrl("users/active")
      return;
    }    

    this.router.navigateByUrl("users/home");    
  }
}

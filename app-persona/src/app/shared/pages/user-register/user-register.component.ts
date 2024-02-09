import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { AlertsService } from 'src/app/core/utils/alerts.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent  implements OnInit {
  user: any = {
    name: "",
    last_name: "",
    type_documentation: "",
    documentation: "",
    phone_number: "",
    email: ""
  };

  constructor(
    private router: Router, 
    private usersSer: UsersService,
    private alertsSer: AlertsService
  ) { }

  ngOnInit() {}

  /**
   * Metodo para cargar la pagina principal y agregar mas productos
   */
  cancel = () => {
    this.router.navigateByUrl("users/login")
  }
  
  /**
   * Metodo para consumir el servicio rest de guardar los datos del usuario en la base de datos
   */
  saveData = async () => {
    await this.alertsSer.openLoading();

    const {error, data}:any = await this.usersSer.registerData('api/user', this.user)

    if(error) {
      /*console.log(typeof(data))
      console.log([data])
      console.log(Object.entries(data));*/
      /*data.map((item:any) => {
        console.log(item)
      })*/
      this.alertsSer.openAlert('Error', data);
      await this.alertsSer.closeLoading();
      return;
    }
    await this.alertsSer.closeLoading();

    this.cancel();
  }


}

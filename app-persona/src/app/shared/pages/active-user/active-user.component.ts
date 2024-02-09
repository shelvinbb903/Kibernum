import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { AlertsService } from 'src/app/core/utils/alerts.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.scss'],
})
export class ActiveUserComponent  implements OnInit {
  userActive:any = {
    address: "prueba",
    password: ""
  }
  constructor(
    private router: Router, 
    private usersSer: UsersService, 
    private alertsSer: AlertsService
  ) { }

  ngOnInit() {
    this.printCurrentPosition();
  }

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    
    console.log('Current position:', coordinates);
  };
  
  /**
   * Metodo para consumir el servicio rest de guardar los datos del usuario en la base de datos
   */
  saveData = async () => {
    await this.alertsSer.openLoading();

    const {error, data}:any = await this.usersSer.updateData(`api/user/${this.usersSer.userDataSession.id}`, this.userActive)

    if(error) {
      this.alertsSer.openAlert('Error', data);
      await this.alertsSer.closeLoading();
      return;
    }
    await this.alertsSer.closeLoading();
    this.router.navigateByUrl("users/home")
  }

  /**
   * Cerrar sesion
   *
   */
  async logout(){
    this.alertsSer.openAlertConfirmation("Confirmación", "¿Desea cancelar la activacion del usuario?", () => {
      this.usersSer.clearSession();
      this.router.navigateByUrl("users/login")
    });
    
  }

}

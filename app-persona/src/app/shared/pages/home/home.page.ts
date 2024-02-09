import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { VehiclesService } from 'src/app/core/services/vehicles.service';
import { AlertsService } from 'src/app/core/utils/alerts.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  listVehicles:any = [];
  user: any = {
    
  };

  constructor(
    private router: Router, 
    private usersSer: UsersService, 
    private vehicleSer: VehiclesService,
    private alertsSer: AlertsService
  ) {}

  async ngOnInit(){
    await this.getUserProfile();
  }

  /**
   * Cerrar sesion
   *
   */
  async logout(){
    this.alertsSer.openAlertConfirmation("Confirmación", "¿Desea cerrar sesión?", () => {
      this.usersSer.clearSession();
      this.router.navigateByUrl("users/login")
    });
    
  }

  /**
   * Abrir pagina de crear vehiculo
   *
   */
  async goRegisterVehicle(){
    this.router.navigateByUrl("users/vehicle/register")
  }

  /**
   * Obtener los datos del usuario junto con los datos de los vehiculos
   *
   */
  async getUserProfile(){
    await this.alertsSer.openLoading();
    
    const {error, data}:any = await this.vehicleSer.getDataVehicles(`api/user/${this.usersSer.userDataSession.id}`);
    if(error) {
      this.alertsSer.openAlert('Error', data);
      await this.alertsSer.closeLoading();
      return;
    }
    this.user = {...data}
    this.listVehicles = [...data.vehicles]
    
    await this.alertsSer.closeLoading();
  }

  /**
   * Cargar datos de un vehiculo seleccionado del usuario de la sesion
   * 
   */
  openDataVehiculo(item:any){
    // console.log("Seleccionado", item)
  }

  /**
   * Cargar imagen por defecto si no encuentra la imagen del vehiculo en el servidor
   * 
   */
  errorImage(img:any){
    img.src = './../../../../assets/icon/car.svg'
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { VehiclesService } from 'src/app/core/services/vehicles.service';
import { AlertsService } from 'src/app/core/utils/alerts.service';

@Component({
  selector: 'app-vehicle-register',
  templateUrl: './vehicle-register.component.html',
  styleUrls: ['./vehicle-register.component.scss'],
})
export class VehicleRegisterComponent  implements OnInit {
  listConfiguraciones:any = [];
  listCarrocerias:any = [];
  vehicle:any = {
    user_id: "",
    car_plate: "",
    year: "",
    setting_id: "",
    body_car_id: "",
    photo: "prueba",
  }

  constructor(
    private router: Router,
    private alertsSer: AlertsService,
    private vehicleSer: VehiclesService,
    private usersSer: UsersService
  ) { }

  async ngOnInit() {
    await this.getConfiguraciones();
    await this.getCarrocerias();
  }

  /**
   * Metodo para cargar la pagina principal y agregar mas productos
   */
  cancel = () => {
    console.log("OK")
    this.router.navigateByUrl("users/home")
  }

  /**
   * Obtener los datos de todas las configuraciones registradas
   *
   */
  async getConfiguraciones(){
    this.listConfiguraciones = [];

    await this.alertsSer.openLoading();
    
    const {error, data}:any = await this.vehicleSer.getDataVehicles(`api/settings/list`);
    if(error) {
      this.alertsSer.openAlert('Error', data);
      await this.alertsSer.closeLoading();
      return;
    }
    this.listConfiguraciones = [...data];
    await this.alertsSer.closeLoading();

  }

  /**
   * Obtener los datos de todas las carrocerias registradas
   *
   */
  async getCarrocerias(){
    this.listCarrocerias = [];

    await this.alertsSer.openLoading();
    
    const {error, data}:any = await this.vehicleSer.getDataVehicles(`api/bodycar/list`);
    if(error) {
      this.alertsSer.openAlert('Error', data);
      await this.alertsSer.closeLoading();
      return;
    }
    this.listCarrocerias = [...data];
    await this.alertsSer.closeLoading();

  }
  
  /**
   * Metodo para consumir el servicio rest de guardar los datos del vehiculo del usuario
   */
  saveData = async () => {
    await this.alertsSer.openLoading();
    this.vehicle.user_id = this.usersSer.userDataSession.id;

    const {error, data}:any = await this.vehicleSer.registerData('api/vehicle', this.vehicle)

    if(error) {
      this.alertsSer.openAlert('Error', data);
      await this.alertsSer.closeLoading();
      return;
    }
    await this.alertsSer.closeLoading();

    this.alertsSer.openAlert('Respuesta', "¡Vehiculo registrado correctamente!", this.cancel);
  }

}

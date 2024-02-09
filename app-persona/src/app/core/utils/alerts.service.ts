import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  loading: any;

  constructor(private alertController: AlertController, private loadingController: LoadingController, private toastController: ToastController) { }

  /**
   * Metodo para generar una alerta de confirmación
   * 
   * @param {string} title         Titulo a mostrar
   * @param {string} description    Descripcion
   * @param {Function} fnt_aceptar  Metodo a ejecutarse en el evento clic del boton del modal antes de cerrarse
   */
  openAlert = async (title: string, description: string, fnt_acept: Function = () => {}) => {
    const alert = await this.alertController.create({
      header: title,
      message: description,
      buttons: [
        {
          text: 'Aceptar',
          handler: async () => {
            await fnt_acept();
          }
        }
      ]
    });
  
    await alert.present();
  }  
  
  /**
   * Metodo para generar una alerta de confirmación
   * 
   * @param {string} titulo         Titulo a mostrar
   * @param {string} descripcion    Descripcion
   * @param {Function} fnt_aceptar  Metodo a ejecutarse en el evento clic del boton aceptar antes de cerrarse la alerta
   * @param {Function} fnt_cancelar Metodo a ejecutarse en el evento clic del boton cancelar antes de cerrarse la alerta
   */
  openAlertConfirmation = async (titulo: string, descripcion: string, fnt_aceptar: Function, fnt_cancelar: Function = () => {}) => {
    const alert = await this.alertController.create({
      header: titulo,
      message: descripcion,
      buttons: [
        {
          text: 'Aceptar',
          handler: async () => {
            await fnt_aceptar()
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: async () => {
            await fnt_cancelar()
          }
        }
      ]
    });
  
    await alert.present();
  }

  /**
   * Cargar en pantalla un modal con un loading y un mensaje mientras se ejecuta una acción
   */
  openLoading = async () => {
    this.loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'bubbles'
    });
    await this.loading.present();    
  }

  /**
   * Cerrar el modal del loading
   */
  closeLoading = async () => {
    await this.loading.dismiss();
  }

  /**
   * Generar una notificación en pantalla con un mensaje
   * 
   * @param mensaje 
   */
  async generateMessage(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      color: 'success',
      position: 'top',
      icon: 'information-circle-outline',
      buttons: [
        {
          text: 'X',
          role: 'cancel',
          handler: () => {
            
          },
        },
      ]
    });
    toast.present();
  }
}

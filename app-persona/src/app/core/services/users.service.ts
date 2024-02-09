import { Injectable } from '@angular/core';
import { RestService } from 'src/app/intranet/connection/rest.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userDataSession: any = {}

  constructor(private rest: RestService) { }

  /**
   * Metodo para consumir el servicio de registrar un usuario
   *
   * @param   {string}  url   URL del servicio
   * @param   {any}     data  Datos que se pasan como parametro. Si no hay se envio un objeto vacio
   *
   * @return  {Promise<Object>}        Retorna una promesa con un objeto, el cual contiene la respuesta del servicio y un atributo para indicar si se genero error
   */
  registerData = (url:string, data: any = {}) => {
    return this.rest.connectionPOST(url, data);
  }

  /**
   * Metodo para consumir el servicio de registrar un usuario
   *
   * @param   {string}  url   URL del servicio
   * @param   {any}     data  Datos que se pasan como parametro. Si no hay se envio un objeto vacio
   *
   * @return  {Promise<Object>}        Retorna una promesa con un objeto, el cual contiene la respuesta del servicio y un atributo para indicar si se genero error
   */
  updateData = (url:string, data: any = {}) => {
    return this.rest.connectionPUT(url, data);
  }

  /**
   * Consumir el servicio rest de tipo get para listar los productos
   * 
   * @param   {string}  url   URL del servicio
   * @param   {any}     data  Datos que se pasan como parametro. Si no hay se envio un objeto vacio
   * 
   * @return  {Promise<Object>}        Retorna una promesa con un objeto, el cual contiene la respuesta del servicio y un atributo para indicar si se genero error
   */
  authenticate = (url:string, data: any = {}) => {
    return this.rest.connectionPOST(url, data);
  }

  /**
   * Guardar los datos del login en la sesion
   *
   * @param   {any}  data  Datos del login
   * 
   */
  saveDataSession(data: any) {
    return new Promise(async (resolve) => {
      sessionStorage.setItem(environment.KEY_USER_SESSION, JSON.stringify(data));
      resolve(true)
    })
    
  }

  /**
   * Cargar los datos de la sesion
   * 
   */
  async loadDataSession() {
    const data = await sessionStorage.getItem(environment.KEY_USER_SESSION)
    if(data) {
      this.userDataSession = JSON.parse(data);
    } 
  }

  /**
   * Borrar los datos de la sesion
   *
   */
  clearSession() {
    sessionStorage.clear()
    sessionStorage.removeItem(environment.KEY_USER_SESSION)
    this.userDataSession = {}
  }
}

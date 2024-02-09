import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  /**
   * Generar una conexion a un servicio rest de tipo post
   *
   * @param   {string}  url   URL del servicio rest a ejecutar
   * @param   {any}     data  Parametros a enviar en el servicio rest
   *
   * @return  {Promise<object>}   Se genera una promesa con el resultado del servicio rest, ya sea correcto o con error
   */
  connectionPOST = (url: string, data: any) => {
    return new Promise(resolve => {            
      this.http.post(`${url}`, data).subscribe({
        next: response => {
          resolve({
            error: false,
            data: response
          })
        },
        error: dataError => {
          resolve({
            error: true,
            data: dataError.error || dataError.error.Message || dataError.error.errors
          })
        }
      })
    })
  }

  /**
   * Generar una conexion a un servicio rest de tipo put
   *
   * @param   {string}  url   URL del servicio rest a ejecutar
   * @param   {any}     data  Parametros a enviar en el servicio rest
   * @param   {string}  token Token de la sesion del usuario
   *
   * @return  {Promise<object>}   Se genera una promesa con el resultado del servicio rest, ya sea correcto o con error
   */
  connectionPUT(url: string, data: any, token: string = "") {
    return new Promise(resolve => {
      let headers = new HttpHeaders();
      headers = headers.append('Authorization', 'Bear ' + token);
      
      this.http.put(url, data, {headers}).subscribe({
        next: response => {
          resolve({
            error: false,
            data: response
          })
        },
        error: dataError => {
          resolve({
            error: true,
            data: dataError.error || dataError.error.Message || dataError.error.errors
          })
        }
      })
    })
  }

  /**
   * Generar una conexion a un servicio rest de tipo get
   *
   * @param   {string}  url   URL del servicio rest a ejecutar
   * @param   {any}     data  Parametros a enviar en el servicio rest
   *
   * @return  {Promise<object>}        Se genera una promesa con el resultado del servicio rest, ya sea correcto o con error
   */
  connectionGET = (url: string, data: any) => {
    return new Promise(resolve => {
      this.http.get(`${url}`, {params: data}).subscribe({
        next: response => {
          resolve({
            error: false,
            data: response
          });
        },
        error: dataError => {
          resolve({
            error: true,
            data: dataError.error.error || dataError.error.Message || dataError.error.errors
          })
        }
      })
    })
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyecto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  baseUrl = environment.baseUrl + 'proyecto/';
  // baseUrl = 'https://porfolio-jonmitsurugi.koyeb.app/proyecto/'
  //baseUrl = 'http://localhost:8080/proyecto/'

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Proyecto[]> {
    return this.httpClient.get<Proyecto[]> (this.baseUrl + 'lista');
  }

  public detail(id: number): Observable<Proyecto> {
    return this.httpClient.get<Proyecto> (this.baseUrl +  "detail" + "/" + id);
  }

  public save(proyecto: Proyecto): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + 'crear', proyecto);
  }

  public update(id: number, proyecto: Proyecto): Observable<any> {
    return this.httpClient.put<any> (this.baseUrl + `actualizar/${id}`, proyecto);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + `borrar/${id}`);
  }

}

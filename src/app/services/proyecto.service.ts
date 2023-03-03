import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {


  expUrl = 'https://porfolio-jonmitsurugi.koyeb.app/proyecto/'
  // expUrl = 'http://localhost:8080/proyecto/'

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Proyecto[]> {
    return this.httpClient.get<Proyecto[]> (this.expUrl + 'lista');
  }

  public detail(id: number): Observable<Proyecto> {
    return this.httpClient.get<Proyecto> (this.expUrl +  "detail" + "/" + id);
  }

  public save(proyecto: Proyecto): Observable<any> {
    return this.httpClient.post<any>(this.expUrl + 'crear', proyecto);
  }

  public update(id: number, proyecto: Proyecto): Observable<any> {
    return this.httpClient.put<any> (this.expUrl + `actualizar/${id}`, proyecto);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.expUrl + `borrar/${id}`);
  }

}

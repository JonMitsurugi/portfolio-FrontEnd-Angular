import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habilidad } from '../models/habilidad';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {

  baseUrl = environment.baseUrl + 'habilidad/';
  // baseUrl = 'https://porfolio-jonmitsurugi.koyeb.app/habilidad/'
  // baseUrl = 'http://localhost:8080/habilidad/'

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Habilidad[]> {
    return this.httpClient.get<Habilidad[]> (this.baseUrl + 'lista');
  }

  public detail(id: number): Observable<Habilidad> {
    return this.httpClient.get<Habilidad> (this.baseUrl +  "detail" + "/" + id);
  }

  public save(habilidad: Habilidad): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + 'crear', habilidad);
  }

  public update(id: number, habilidad: Habilidad): Observable<any> {
    return this.httpClient.put<any> (this.baseUrl + `actualizar/${id}`, habilidad);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + `borrar/${id}`);
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habilidad } from '../models/habilidad';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {

  estUrl = 'http://localhost:8080/habilidad/'

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Habilidad[]> {
    return this.httpClient.get<Habilidad[]> (this.estUrl + 'lista');
  }

  public detail(id: number): Observable<Habilidad> {
    return this.httpClient.get<Habilidad> (this.estUrl +  "detail" + "/" + id);
  }

  public save(habilidad: Habilidad): Observable<any> {
    return this.httpClient.post<any>(this.estUrl + 'crear', habilidad);
  }

  public update(id: number, habilidad: Habilidad): Observable<any> {
    return this.httpClient.put<any> (this.estUrl + `actualizar/${id}`, habilidad);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.estUrl + `borrar/${id}`);
  }

}

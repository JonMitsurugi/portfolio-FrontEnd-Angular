import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../models/experiencia';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  baseUrl = environment.baseUrl + 'experiencia/';
  // baseUrl = 'https://porfolio-jonmitsurugi.koyeb.app/experiencia/'
  // baseUrl = 'http://localhost:8080/experiencia/'

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Experiencia[]> {
    return this.httpClient.get<Experiencia[]> (this.baseUrl + 'lista');
  }

  public detail(id: number): Observable<Experiencia> {
    return this.httpClient.get<Experiencia> (this.baseUrl +  "detail" + "/" + id);
  }

  public save(experiencia: Experiencia): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + 'crear', experiencia);
  }

  public update(id: number, experiencia: Experiencia): Observable<any> {
    return this.httpClient.put<any> (this.baseUrl + `actualizar/${id}`, experiencia);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + `borrar/${id}`);
  }

}

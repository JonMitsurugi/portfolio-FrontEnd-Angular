import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudio } from '../models/estudio';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudioService {

  baseUrl = environment.baseUrl + 'estudio/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Estudio[]> {
    return this.httpClient.get<Estudio[]> (this.baseUrl + 'lista');
  }

  public detail(id: number): Observable<Estudio> {
    return this.httpClient.get<Estudio> (this.baseUrl +  "detail" + "/" + id);
  }

  public save(estudio: Estudio): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + 'crear', estudio);
  }

  public update(id: number, estudio: Estudio): Observable<any> {
    return this.httpClient.put<any> (this.baseUrl + `actualizar/${id}`, estudio);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + `borrar/${id}`);
  }


}

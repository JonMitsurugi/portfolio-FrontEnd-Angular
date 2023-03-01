import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudio } from '../models/estudio';

@Injectable({
  providedIn: 'root'
})
export class EstudioService {

  estUrl = 'http://porfolio-jonmitsurugi.koyeb.app/estudio/'
  // estUrl = 'http://localhost:8080/estudio/'

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Estudio[]> {
    return this.httpClient.get<Estudio[]> (this.estUrl + 'lista');
  }

  public detail(id: number): Observable<Estudio> {
    return this.httpClient.get<Estudio> (this.estUrl +  "detail" + "/" + id);
  }

  public save(estudio: Estudio): Observable<any> {
    return this.httpClient.post<any>(this.estUrl + 'crear', estudio);
  }

  public update(id: number, estudio: Estudio): Observable<any> {
    return this.httpClient.put<any> (this.estUrl + `actualizar/${id}`, estudio);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.estUrl + `borrar/${id}`);
  }


}

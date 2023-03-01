import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  url = 'http://porfolio-jonmitsurugi.koyeb.app/personas/';
  // url = 'http://localhost:8080/personas/';

  constructor(private httpClient: HttpClient ) {}

  public lista(): Observable<Persona> {
    return this.httpClient.get<Persona>(this.url +'lista');
  }

  public detail(id: number): Observable<Persona> {
    return this.httpClient.get<Persona> (this.url +  "detail" + "/" + id);
  }

  public save(persona: Persona): Observable<any> {
    return this.httpClient.post<any>(this.url + 'crear', persona);
  }

  public update(id: number, persona: Persona): Observable<any> {
    return this.httpClient.put<any> (this.url + `actualizar/${id}`, persona);
  }

}

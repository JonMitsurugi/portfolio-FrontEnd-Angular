import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  baseUrl = environment.baseUrl + 'personas/';

  constructor(private httpClient: HttpClient ) {}

  public lista(): Observable<Persona> {
    return this.httpClient.get<Persona>(this.baseUrl +'lista');
  }

  public detail(id: number): Observable<Persona> {
    return this.httpClient.get<Persona> (this.baseUrl +  "detail" + "/" + id);
  }

  public save(persona: Persona): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + 'crear', persona);
  }

  public update(id: number, persona: Persona): Observable<any> {
    return this.httpClient.put<any> (this.baseUrl + `actualizar/${id}`, persona);
  }

}

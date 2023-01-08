import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Experiencia } from '../models/experiencia';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  cargar(service: any, list: any[]): void {
    service.lista().subscribe(
      (data: any[]) => {
        list = data;
        console.log(data);
        console.log("desde la lista");
        console.log(list);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  borrar(service: any, callback: any, id?: number): void {
    if (id !== undefined) {
      service.delete(id).subscribe({
        next: (data: any) => {
          callback;
          console.log(data);
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      })
    }
  }
}

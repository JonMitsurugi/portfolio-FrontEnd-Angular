import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSource = new Subject();
  alert = this.alertSource.asObservable();


  constructor() { }

  showAlert(message: string, time: number = 5000, toastType: string = "exito" ) {

    this.alertSource.next({message, time, toastType});
  }
}

import { Component } from '@angular/core';
import { AlertService } from './services/alert.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'porfolio';
  toastType = "exito"
  showAlert = false;
  message ="";

constructor(private alertService: AlertService) {}

ngOnInit() {
  this.alertService.alert.subscribe((res:any) => {
    this.message = res.message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, res.time)
    this.toastType = res.toastType;
  })
}
}



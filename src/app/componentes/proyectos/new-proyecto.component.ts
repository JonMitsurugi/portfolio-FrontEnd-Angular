import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'src/app/models/proyecto';
import { AlertService } from 'src/app/services/alert.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-new-proyecto',
  templateUrl: './new-proyecto.component.html',
  styleUrls: ['./new-proyecto.component.css']
})
export class NewProyectoComponent implements OnInit  {

  modalOptions:NgbModalOptions;

  proyecto: Proyecto = null;
  nombrePro: string = '';
  urlPro: string;
  tipoPro: string = '';
  descripcionPro: string = '';

  constructor(private activatedRoute: ActivatedRoute,private alertService: AlertService,private modalService: NgbModal,public activeModal: NgbActiveModal, private proyectoService: ProyectoService) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }

  modalReference: NgbModalRef;


  ngOnInit(): void {
  }

  onCreate(): void {
    const proyecto = new Proyecto(this.nombrePro, this.tipoPro,this.urlPro, this.descripcionPro);
    this.proyectoService.save(proyecto).subscribe(
      () => {
      this.activeModal.close();
      this.alertService.showAlert("Experiencia añadida exitosamente", 7000, "exito");
      },
      (err: HttpErrorResponse) => {
      alert(err.message);
        this.activeModal.dismiss();
      this.alertService.showAlert("La carga de la proyecto falló", 7000, "error");

    })
  }


}

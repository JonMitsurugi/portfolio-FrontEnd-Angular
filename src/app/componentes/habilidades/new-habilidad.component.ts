import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModalOptions, NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Habilidad } from 'src/app/models/habilidad';
import { AlertService } from 'src/app/services/alert.service';
import { HabilidadService } from 'src/app/services/habilidad.service';

@Component({
  selector: 'app-new-habilidad',
  templateUrl: './new-habilidad.component.html',
  styleUrls: ['./new-habilidad.component.css']
})
export class NewHabilidadComponent implements OnInit {

  modalOptions:NgbModalOptions;

  habilidad: Habilidad = null;
  nombreHab: string = '';
  urlImgHab: string = '';
  descripcionHab: string = '';
  progresoHab: number = 0;


  constructor(private activatedRoute: ActivatedRoute,private alertService: AlertService,private modalService: NgbModal,public activeModal: NgbActiveModal, private habilidadService: HabilidadService) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }

  modalReference: NgbModalRef;


  ngOnInit(): void {
  }

  onCreate(): void {
    const habilidad = new Habilidad(this.nombreHab, this.urlImgHab, this.descripcionHab, this.progresoHab);
    this.habilidadService.save(habilidad).subscribe(
      () => {
        this.activeModal.close();
        this.alertService.showAlert("Experiencia añadida exitosamente", 7000, "exito");
      },
      (err: HttpErrorResponse) => {
      alert(err.message);
        this.activeModal.dismiss();
        this.alertService.showAlert("La carga de la habilidad falló", 7000, "error");
    })
  }

}

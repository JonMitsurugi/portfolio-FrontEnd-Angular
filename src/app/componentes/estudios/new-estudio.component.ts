import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Estudio } from 'src/app/models/estudio';
import { AlertService } from 'src/app/services/alert.service';
import { EstudioService } from 'src/app/services/estudio.service';

@Component({
  selector: 'app-new.estudio',
  templateUrl: './new-estudio.component.html',
  styleUrls: ['./new-estudio.component.css']
})
export class NewEstudioComponent implements OnInit {

  modalOptions:NgbModalOptions;

  estudio: Estudio = null;
  nombreEst: string = '';
  urlImgEst: string = '';
  fechaInicioEst: number;
  fechaFinEst?: number;
  lugarEst: string = '';
  descripcionEst: string = '';

  constructor(private activatedRoute: ActivatedRoute,private alertService: AlertService,private modalService: NgbModal,public activeModal: NgbActiveModal, private estudioService: EstudioService) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }

  modalReference: NgbModalRef;


  ngOnInit(): void {
  }

  onCreate(): void {
    const estudio = new Estudio(this.nombreEst, this.urlImgEst, this.fechaInicioEst, this.fechaFinEst, this.lugarEst, this.descripcionEst);
    this.estudioService.save(estudio).subscribe(
      () => {
      this.activeModal.close();
      this.alertService.showAlert("Experiencia añadida exitosamente", 7000, "exito");
      },
      (err: HttpErrorResponse) => {
      alert(err.message);
        this.activeModal.dismiss();
      this.alertService.showAlert("La carga de la estudio falló", 7000, "error");

    })
  }

}

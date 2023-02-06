import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import {NgbModal, ModalDismissReasons, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-experiencia',
  templateUrl: './new-experiencia.component.html',
  styleUrls: ['./new-experiencia.component.css']
})
export class NewExperienciaComponent implements OnInit {

  @Input() creationObject: any;
  @Output() addedData = new EventEmitter();


  title = 'ng-bootstrap-modal-demo';
  closeResult: string;
  modalOptions:NgbModalOptions;

  experiencia: Experiencia = null;
  nombreExp: string = '';
  fechaInicioExp: number ;
  fechaFinExp?: number;
  rolExp: string = '';
  descripcionExp: string = '';


  constructor(private activatedRoute: ActivatedRoute,private alertService: AlertService,private modalService: NgbModal,public activeModal: NgbActiveModal, private experienciaService: ExperienciaService, private router: Router) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
   }

  modalReference: NgbModalRef;

  ngOnInit(): void {
  }

  onCreate(): void {
    const experiencia = new Experiencia(this.nombreExp, this.fechaInicioExp!, this.fechaFinExp!, this.rolExp, this.descripcionExp);
    this.experienciaService.save(experiencia).subscribe(
      (next) => {
      this.activeModal.close();
      this.alertService.showAlert("Experiencia añadida exitosamente", 7000, "exito");
      },
      (err: HttpErrorResponse) => {
      alert(err.message);
        this.activeModal.dismiss();
      this.alertService.showAlert("La carga de la experiencia falló", 7000, "error");

    })
  }

  checkNumberFieldLength(elem: any){
    let filterValue = (elem.target as HTMLInputElement).value;
    if (filterValue.length > 4) {
        filterValue = filterValue.slice(0,4);
    }
}
}



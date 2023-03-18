import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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

  isSubmitting = false;
  buttonText = 'Enviar';
  crudForm: FormGroup;
  modalOptions:NgbModalOptions;

  estudio: Estudio = null;


  constructor(private alertService: AlertService, public activeModal: NgbActiveModal, private estudioService: EstudioService, private formBuilder: FormBuilder) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }

  modalReference: NgbModalRef;

  ngOnInit(): void {
    this.crudForm = this.formBuilder.group({
      nombreEst: ['', Validators.required],
      urlImgEst: '',
      fechaInicioEst: ['', Validators.required],
      fechaFinEst: '',
      lugarEst: ['', Validators.required],
      descripcionEst: ['', Validators.required],
    })
  }

  onCreate(): void {
    if (!this.crudForm.valid) {
      event.preventDefault();
      event.stopPropagation();
      this.crudForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.buttonText = ' Enviando...';

    const estudio = this.crudForm.value;
    this.estudioService.save(estudio).subscribe(
      () => {
      this.isSubmitting = false;
      this.buttonText = 'Enviar';
      this.activeModal.close();
      this.alertService.showAlert("Experiencia añadida exitosamente", 7000, "exito");
    },
    (err: HttpErrorResponse) => {
      // alert(err.message);
      this.isSubmitting = false;
      this.buttonText = 'Enviar';
      this.activeModal.dismiss();
      this.alertService.showAlert("La creación del estudio falló", 7000, "error");

    })
  }



}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  isSubmitting = false;
  buttonText = 'Enviar';
  crudForm: FormGroup;
  modalOptions:NgbModalOptions;

  habilidad: Habilidad = null;

  constructor(private alertService: AlertService, public activeModal: NgbActiveModal, private habilidadService: HabilidadService, private formBuilder: FormBuilder) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }

  modalReference: NgbModalRef;


  ngOnInit(): void {
    this.crudForm = this.formBuilder.group({
      nombreHab: ['', Validators.required],
      urlImgHab: ['', Validators.required],
      descripcionHab: ['', Validators.required],
      progresoHab: ['', Validators.required],
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

    const habilidad = this.crudForm.value;
    this.habilidadService.save(habilidad).subscribe(
      () => {
        this.isSubmitting = false;
        this.buttonText = 'Enviar';
        this.activeModal.close();
        this.alertService.showAlert("Habilidad añadida exitosamente", 7000, "exito");
      },
      (err: HttpErrorResponse) => {
      // alert(err.message);
        this.isSubmitting = false;
        this.buttonText = 'Enviar';
        this.activeModal.dismiss("pepe");
        this.alertService.showAlert("La creación de la habilidad falló", 7000, "error");
    })
  }

}

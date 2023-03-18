import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  isSubmitting = false;
  buttonText = 'Enviar';
  crudForm: FormGroup;
  modalOptions:NgbModalOptions;

  proyecto: Proyecto = null;


  constructor(private alertService: AlertService,public activeModal: NgbActiveModal, private proyectoService: ProyectoService, private formBuilder: FormBuilder) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }

  modalReference: NgbModalRef;


  ngOnInit(): void {
    this.crudForm = this.formBuilder.group({
      nombrePro: ['', Validators.required],
      urlPro: '',
      tipoPro:['', Validators.required],
      descripcionPro: ['', Validators.required],
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

    const proyecto = this.crudForm.value;
    this.proyectoService.save(proyecto).subscribe(
      () => {
      this.isSubmitting = false;
      this.buttonText = 'Enviar';
      this.activeModal.close();
      this.alertService.showAlert("Experiencia añadida exitosamente", 7000, "exito");
      },
      (err: HttpErrorResponse) => {
      //alert(err.message);
      this.isSubmitting = false;
      this.buttonText = 'Enviar';
      this.activeModal.dismiss();
      this.alertService.showAlert("La carga de la proyecto falló", 7000, "error");

    })
  }


}

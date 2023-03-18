import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Habilidad } from 'src/app/models/habilidad';
import { HabilidadService } from 'src/app/services/habilidad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-habilidad',
  templateUrl: './edit-habilidad.component.html',
  styleUrls: ['./edit-habilidad.component.css']
})
export class EditHabilidadComponent implements OnInit{

  @Input() inputHabilidad: Habilidad;

  isSubmitting = false;
  buttonText = 'Actualizar';
  modalOptions:NgbModalOptions;
  habilidadList: Habilidad[] = [];

  constructor(private alertService: AlertService,private habilidadService: HabilidadService, public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    this.modalOptions = {
      backdropClass:'customBackdrop'
    }
  }

  crudForm: FormGroup = this.formBuilder.group({
    nombreHab: ['', Validators.required],
    urlImgHab: ['', Validators.required],
    descripcionHab: ['', Validators.required],
    progresoHab: ['', Validators.required],
  })

  ngOnInit(): void {
    this.crudForm.patchValue({
      nombreHab: this.inputHabilidad.nombreHab,
      urlImgHab: this.inputHabilidad.urlImgHab,
      descripcionHab: this.inputHabilidad.descripcionHab,
      progresoHab: this.inputHabilidad.progresoHab,
    })
  }

  cargarHabilidad(): void {
    this.habilidadService.lista().subscribe({
      next: (data: Habilidad[]) => {
        console.log(data);
        this.habilidadList = data;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  onUpdate(): void {
    if (!this.crudForm.valid) {
      event.preventDefault();
      event.stopPropagation();
      this.crudForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.buttonText = ' Actualizando...';

    const habilidad = this.crudForm.value;
    this.habilidadService.update(this.inputHabilidad.id, habilidad).subscribe({
      next: (data: Habilidad) => {
      this.isSubmitting = false;
      this.buttonText = 'Enviar';
      this.activeModal.close(JSON.stringify(this.inputHabilidad));
      this.cargarHabilidad();
      this.alertService.showAlert("Habilidad actualizada exitosamente", 7000, "exito");
    },
    error: (error:HttpErrorResponse) => {
      // alert(error.message)
      this.isSubmitting = false;
      this.buttonText = 'Enviar';
      this.cargarHabilidad();
      this.activeModal.dismiss();
      this.alertService.showAlert("Error al actualizar habilidad", 7000, "error");
      }
    })
  }
}


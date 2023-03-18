import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.css']
})
export class EditExperienciaComponent implements OnInit {

  @Input() inputExperiencia: Experiencia;

  isSubmitting = false;
  buttonText = 'Actualizar';
  modalOptions:NgbModalOptions;
  experienciaList: Experiencia[] = [];

  constructor(private alertService: AlertService,private experienciaService: ExperienciaService, public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    this.modalOptions = {
      backdropClass:'customBackdrop'
    }  }

    crudForm: FormGroup = this.formBuilder.group({
      nombreExp: ['', Validators.required],
      fechaInicioExp: ['', Validators.required],
      fechaFinExp: '',
      rolExp: ['', Validators.required],
      descripcionExp: ['', Validators.required],
    })

    ngOnInit(): void {
      this.crudForm.patchValue({
        nombreExp: this.inputExperiencia.nombreExp,
        fechaInicioExp: this.inputExperiencia.fechaInicioExp,
        fechaFinExp: this.inputExperiencia.fechaFinExp,
        rolExp: this.inputExperiencia.rolExp,
        descripcionExp: this.inputExperiencia.descripcionExp
      })
    }

    cargarExperiencia(): void {
      this.experienciaService.lista().subscribe({
        next: (data: Experiencia[]) => {
          console.log(data);
          this.experienciaList = data;
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

      const experiencia = this.crudForm.value;
      this.experienciaService.update(this.inputExperiencia.id, experiencia).subscribe({
        next: (data: Experiencia) => {
        this.isSubmitting = false;
        this.buttonText = 'Enviar';
        this.activeModal.close(JSON.stringify(this.inputExperiencia) );
        this.cargarExperiencia();
        this.alertService.showAlert("Experiencia actualizada exitosamente", 7000, "exito");
      },
      error: (error:HttpErrorResponse) => {
        //alert(error.message)
        //console.log(error.message)
        this.isSubmitting = false;
        this.buttonText = 'Enviar';
        this.cargarExperiencia();
        this.activeModal.dismiss();
        this.alertService.showAlert("Error al actualizar experiencia", 7000, "error");
        }
      })
    }
}

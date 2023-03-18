import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Estudio } from 'src/app/models/estudio';
import { AlertService } from 'src/app/services/alert.service';
import { EstudioService } from 'src/app/services/estudio.service';

@Component({
  selector: 'app-edit-estudio',
  templateUrl: './edit-estudio.component.html',
  styleUrls: ['./edit-estudio.component.css']
})
export class EditEstudioComponent implements OnInit{

  @Input() inputEstudio: Estudio;

  isSubmitting = false;
  buttonText = 'Actualizar';
  isLoading = false;
  modalOptions:NgbModalOptions;
  estudioList: Estudio[] = [];

  constructor(private alertService: AlertService,private estudioService: EstudioService, public activeModal: NgbActiveModal, private formBuilder: FormBuilder){
    this.modalOptions = {
      backdropClass:'customBackdrop'
    }
  }

  crudForm: FormGroup = this.formBuilder.group({
    nombreEst: ['', Validators.required],
    urlImgEst: '',
    fechaInicioEst: ['', Validators.required],
    fechaFinEst: '',
    lugarEst: ['', Validators.required],
    descripcionEst: ['', Validators.required],
  })

  ngOnInit(): void {
    this.crudForm.patchValue({
      nombreEst: this.inputEstudio.nombreEst,
      urlImgEst: this.inputEstudio.urlImgEst,
      fechaInicioEst: this.inputEstudio.fechaInicioEst,
      fechaFinEst: this.inputEstudio.fechaFinEst,
      lugarEst: this.inputEstudio.lugarEst,
      descripcionEst: this.inputEstudio.descripcionEst
    })
  }

  cargarEstudio(): void {
    this.estudioService.lista().subscribe({
      next: (data: Estudio[]) => {
        console.log(data);
        this.estudioList = data;
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
    const estudio = this.crudForm.value;

    this.estudioService.update(this.inputEstudio.id, estudio).subscribe({
      next: (data: Estudio) => {
        this.isSubmitting = false;
        this.buttonText = 'Enviar';
        this.activeModal.close(JSON.stringify(this.inputEstudio) );
        this.cargarEstudio();
        this.alertService.showAlert("Estudio actualizado exitosamente", 7000, "exito");
      },
      error: (error:HttpErrorResponse) => {
        // alert(error.message)
        this.isSubmitting = false;
        this.buttonText = 'Enviar';
        this.cargarEstudio();
        this.activeModal.dismiss();
        this.alertService.showAlert("Error al actualizar estudio", 7000, "error");
      }
    })
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'src/app/models/proyecto';
import { AlertService } from 'src/app/services/alert.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css']
})
export class EditProyectoComponent implements OnInit {

  @Input() inputProyecto: Proyecto;

  isSubmitting = false;
  buttonText = 'Actualizar';
  // modalOptions:NgbModalOptions;
  proyectoList: Proyecto[] = [];

  constructor(private alertService: AlertService,private proyectoService: ProyectoService, public activeModal: NgbActiveModal, private formBuilder: FormBuilder){
    // this.modalOptions = {
    //   backdrop: 'static',
    //   backdropClass:'customBackdrop'
    // }
  }

  crudForm: FormGroup = this.formBuilder.group({
    nombrePro: ['', Validators.required],
    urlPro: '',
    tipoPro: ['', Validators.required],
    descripcionPro: ['', Validators.required],
  })

  ngOnInit(): void {
    this.crudForm.patchValue({
      nombrePro: this.inputProyecto.nombrePro,
      urlPro: this.inputProyecto.urlPro,
      tipoPro: this.inputProyecto.tipoPro,
      descripcionPro: this.inputProyecto.descripcionPro
    })
  }

  cargarProyecto(): void {
    this.proyectoService.lista().subscribe({
      next: (data: Proyecto[]) => {
        console.log(data);
        this.proyectoList = data;
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

    const proyecto = this.crudForm.value;
    this.proyectoService.update(this.inputProyecto.id, proyecto).subscribe({
      next: (data: Proyecto) => {
      this.isSubmitting = false;
      this.buttonText = 'Enviar';
      this.activeModal.close(JSON.stringify(this.inputProyecto) );
      this.cargarProyecto();
      this.alertService.showAlert("Proyecto actualizada exitosamente", 7000, "exito");
    },
    error: (error:HttpErrorResponse) => {
      //alert(error.message)
      this.isSubmitting = false;
      this.buttonText = 'Enviar';
      this.cargarProyecto();
      this.activeModal.dismiss();
      this.alertService.showAlert("Error al modificar proyecto", 7000, "error");
      }
    })
  }
}

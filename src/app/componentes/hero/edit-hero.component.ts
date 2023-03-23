import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Persona } from 'src/app/models/persona.model';
import { PersonaService } from 'src/app/services/persona.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.css']
})
export class EditHeroComponent implements OnInit {

  @Input() inputPersona: Persona;

  isSubmitting = false;
  buttonText = 'Actualizar';
  modalOptions:NgbModalOptions;
  persona: Persona;

  constructor(private alertService: AlertService,private personaService: PersonaService, public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    this.modalOptions = {
      backdropClass:'customBackdrop'
    }
  }

  crudForm: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    descripcion: ['', Validators.required],
    imgFondo: ['', Validators.required],
    imgPerfil: ['', Validators.required],
  })

  ngOnInit(): void {
    this.crudForm.patchValue({
      nombre: this.inputPersona.nombre,
      apellido: this.inputPersona.apellido,
      descripcion: this.inputPersona.descripcion,
      imgFondo: this.inputPersona.imgFondo,
      imgPerfil: this.inputPersona.imgPerfil
    })
  }

  cargarPersona(): void {
    this.personaService.lista().subscribe({
      next: (data: Persona) => {
        console.log(data);
        this.persona = data;
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

    const persona = this.crudForm.value;
    this.personaService.update(this.inputPersona.id, persona).subscribe({
      next: () => {
      this.activeModal.close(JSON.stringify(this.inputPersona));
      this.cargarPersona();
      this.alertService.showAlert("Persona actualizada exitosamente", 7000, "exito");
    },
    error: () => {
      //alert(error.message)
      this.cargarPersona();
      this.activeModal.dismiss();
      this.alertService.showAlert("Error al actualizar persona", 7000, "error");
      }
    })
  }
}



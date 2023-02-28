import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Persona } from 'src/app/models/persona.model';
import { PersonaService } from 'src/app/services/persona.service'

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.css']
})
export class EditHeroComponent implements OnInit {

  @Input() inputPersona: Persona;

  modalOptions:NgbModalOptions;
  persona: Persona;

  constructor(private alertService: AlertService,private personaService: PersonaService, private activatedRoute: ActivatedRoute, private router: Router, public activeModal: NgbActiveModal) {
    this.modalOptions = {
      backdropClass:'customBackdrop'
    }
  }

  ngOnInit(): void {

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
    this.personaService.update(this.inputPersona.id, this.inputPersona).subscribe({
      next: (data: Persona) => {
      this.activeModal.close(JSON.stringify(this.inputPersona));
      this.cargarPersona();
      this.alertService.showAlert("Experiencia actualizada exitosamente", 7000, "exito");
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message)
      this.cargarPersona();
      this.activeModal.dismiss();
      this.alertService.showAlert("Error al modificar experiencia", 7000, "error");
      }
    })
  }
}



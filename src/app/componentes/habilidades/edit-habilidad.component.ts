import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Habilidad } from 'src/app/models/habilidad';
import { HabilidadService } from 'src/app/services/habilidad.service';

@Component({
  selector: 'app-edit-habilidad',
  templateUrl: './edit-habilidad.component.html',
  styleUrls: ['./edit-habilidad.component.css']
})
export class EditHabilidadComponent implements OnInit{

  @Input() inputHabilidad: Habilidad;

  modalOptions:NgbModalOptions;
  habilidadList: Habilidad[] = [];

  constructor(private alertService: AlertService,private habilidadService: HabilidadService, private activatedRoute: ActivatedRoute, private router: Router, public activeModal: NgbActiveModal) {
    this.modalOptions = {
      backdropClass:'customBackdrop'
    }
  }

  ngOnInit(): void {
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
    this.habilidadService.update(this.inputHabilidad.id, this.inputHabilidad).subscribe({
      next: (data: Habilidad) => {
      this.activeModal.close(JSON.stringify(this.inputHabilidad));
      this.cargarHabilidad();
      this.alertService.showAlert("Experiencia actualizada exitosamente", 7000, "exito");
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message)
      this.cargarHabilidad();
      this.activeModal.dismiss();
      this.alertService.showAlert("Error al modificar experiencia", 7000, "error");
      }
    })
  }
}


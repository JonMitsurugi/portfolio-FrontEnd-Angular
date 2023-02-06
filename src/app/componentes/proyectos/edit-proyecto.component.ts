import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit} from '@angular/core';
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

  modalOptions:NgbModalOptions;
  proyectoList: Proyecto[] = [];

  constructor(private alertService: AlertService,private proyectoService: ProyectoService, private activatedRoute: ActivatedRoute, private router: Router, public activeModal: NgbActiveModal){
    this.modalOptions = {
      backdropClass:'customBackdrop'
    }
  }

  ngOnInit(): void {

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
    this.proyectoService.update(this.inputProyecto.id, this.inputProyecto).subscribe({
      next: (data: Proyecto) => {
      this.activeModal.close(JSON.stringify(this.inputProyecto) );
      this.cargarProyecto();
      this.alertService.showAlert("Proyecto actualizada exitosamente", 7000, "exito");
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message)
      this.cargarProyecto();
      this.activeModal.dismiss();
      this.alertService.showAlert("Error al modificar proyecto", 7000, "error");
      }
    })
  }
}

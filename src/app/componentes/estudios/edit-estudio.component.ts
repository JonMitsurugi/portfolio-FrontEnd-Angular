import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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

  modalOptions:NgbModalOptions;
  estudioList: Estudio[] = [];

  constructor(private alertService: AlertService,private estudioService: EstudioService, private activatedRoute: ActivatedRoute, private router: Router, public activeModal: NgbActiveModal){
    this.modalOptions = {
      backdropClass:'customBackdrop'
    }
  }

  ngOnInit(): void {

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
    this.estudioService.update(this.inputEstudio.id, this.inputEstudio).subscribe({
      next: (data: Estudio) => {
      this.activeModal.close(JSON.stringify(this.inputEstudio) );
      this.cargarEstudio();
      this.alertService.showAlert("Estudio actualizada exitosamente", 7000, "exito");
    },
    error: (error:HttpErrorResponse) => {
      alert(error.message)
      this.cargarEstudio();
      this.activeModal.dismiss();
      this.alertService.showAlert("Error al modificar estudio", 7000, "error");
      }
    })
  }
}

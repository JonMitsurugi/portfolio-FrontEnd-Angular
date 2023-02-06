import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { TokenService } from 'src/app/services/token.service';
import { NewExperienciaComponent } from './new-experiencia.component';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { EditExperienciaComponent } from './edit-experiencia.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  closeResult: string;
  experienciaList: any[];
  private modalRef: NgbModalRef;

  constructor(public utils: UtilsService, private modalService: NgbModal, public experienciaService: ExperienciaService, private tokenService: TokenService) {

  }


  isLogged = false;

  ngOnInit(): void {
    this.experienciaService.lista().subscribe(
      data => {
        console.log(data);
        this.experienciaList = data;
    })

    if(this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
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

  borrar(id?: number): void {
    if (id !== undefined) {
      this.experienciaService.delete(id).subscribe({
        next: (data: Experiencia) => {
          this.experienciaList = this.experienciaList.filter( item => item.id != id);
          console.log(data);
          this.cargarExperiencia();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      })
    }
  }

  open(componentName: string ) {
    const mapper = {
      'NewExperienciaComponent': NewExperienciaComponent,
      'EditExperienciaComponent': EditExperienciaComponent,
    }

    this.modalRef = this.modalService.open(mapper[componentName as keyof typeof mapper]);
    this.modalRef.result.then((result) => {
      console.log(this.closeResult);
      this.cargarExperiencia();
    }
    );
  }


  openEditModal(experiencia: any) {
    const modalRef = this.modalService.open(EditExperienciaComponent);
    modalRef.componentInstance.inputExperiencia = experiencia;

    modalRef.result.then((result) => {
      this.cargarExperiencia();
      }, (reason) => {
      this.cargarExperiencia();
      });
  }

}



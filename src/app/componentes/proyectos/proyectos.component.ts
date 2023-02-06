import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TokenService } from 'src/app/services/token.service';
import { UtilsService } from 'src/app/services/utils.service';
import { EditProyectoComponent } from './edit-proyecto.component';
import { NewProyectoComponent } from './new-proyecto.component';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectoList: Proyecto[];
  isLogged = false;
  private modalRef: NgbModalRef;


  constructor(public utils: UtilsService, private modalService: NgbModal, public proyectoService: ProyectoService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.proyectoService.lista().subscribe(
      data => {
        console.log(data);
        this.proyectoList = data;
    })

    if(this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
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

  borrar(id?: number): void {
    if (id !== undefined) {
      this.proyectoService.delete(id).subscribe({
        next: (data: Proyecto) => {
          this.proyectoList = this.proyectoList.filter( item => item.id != id);
          console.log(data);
          this.cargarProyecto();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      })
    }
  }

  newModal() {
    this.modalRef = this.modalService.open(NewProyectoComponent);
    this.modalRef.result.then((result) => {
      this.cargarProyecto();
    }
    );
  }


  editModal(proyecto: any) {
    const modalRef = this.modalService.open(EditProyectoComponent);
    modalRef.componentInstance.inputProyecto = proyecto;

    modalRef.result.then((result) => {
      this.cargarProyecto();
      }, (reason) => {
      this.cargarProyecto();
      });
  }
}

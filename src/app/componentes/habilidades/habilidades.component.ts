import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Habilidad } from 'src/app/models/habilidad';
import { HabilidadService } from 'src/app/services/habilidad.service';
import { CdkDrag, CdkDragDrop, CdkDragMove, CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';
import { TokenService } from 'src/app/services/token.service';
import { UtilsService } from 'src/app/services/utils.service';
import { NewHabilidadComponent } from './new-habilidad.component';
import { EditHabilidadComponent } from './edit-habilidad.component';
import { ViewportRuler } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  closeResult: string;
  habilidadList: Habilidad[];
  private modalRef: NgbModalRef;
  isLogged = false;

  constructor(public utils: UtilsService, private modalService: NgbModal, public habilidadService: HabilidadService, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.habilidadService.lista().subscribe(
      data => {
        console.log(data);
        this.habilidadList = data;
    })

    if(this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
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

  borrar(id?: number): void {
    if (id !== undefined) {
      this.habilidadService.delete(id).subscribe({
        next: (data: Habilidad) => {
          this.habilidadList = this.habilidadList.filter( item => item.id != id);
          console.log(data);
          this.cargarHabilidad();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      })
    }
  }

  newModal() {
    this.modalRef = this.modalService.open(NewHabilidadComponent);
    this.modalRef.result.then((result) => {
      this.cargarHabilidad();
    }
    );
  }

  editModal(habilidad: any) {
    const modalRef = this.modalService.open(EditHabilidadComponent);
    modalRef.componentInstance.inputHabilidad = habilidad;

    modalRef.result.then((result) => {
      this.cargarHabilidad();
      }, (reason) => {
      this.cargarHabilidad();
      });
  }


}


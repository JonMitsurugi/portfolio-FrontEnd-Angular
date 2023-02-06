import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Estudio } from 'src/app/models/estudio';
import { EstudioService } from 'src/app/services/estudio.service';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { TokenService } from 'src/app/services/token.service';
import { UtilsService } from 'src/app/services/utils.service';
import { NewEstudioComponent } from './new-estudio.component';
import { EditEstudioComponent } from './edit-estudio.component';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent implements OnInit {

  closeResult: string;
  estudioList: Estudio[];
  private modalRef: NgbModalRef;
  isLogged = false;

  constructor(public utils: UtilsService, private modalService: NgbModal, public estudioService: EstudioService, private tokenService: TokenService) { }


  ngOnInit(): void {
    this.estudioService.lista().subscribe(
      data => {
        console.log(data);
        this.estudioList = data;
    })

    if(this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
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

  borrar(id?: number): void {
    if (id !== undefined) {
      this.estudioService.delete(id).subscribe({
        next: (data: Estudio) => {
          this.estudioList = this.estudioList.filter( item => item.id != id);
          console.log(data);
          this.cargarEstudio();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      })
    }
  }

  newModal() {
    this.modalRef = this.modalService.open(NewEstudioComponent);
    this.modalRef.result.then((result) => {
      this.cargarEstudio();
    }
    );
  }

  editModal(estudio: any) {
    const modalRef = this.modalService.open(EditEstudioComponent);
    modalRef.componentInstance.inputEstudio = estudio;

    modalRef.result.then((result) => {
      this.cargarEstudio();
      }, (reason) => {
      this.cargarEstudio();
      });
  }
}

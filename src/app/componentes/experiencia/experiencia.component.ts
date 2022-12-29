import { Component, ComponentRef, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { TokenService } from 'src/app/services/token.service';
import { NewExperienciaComponent } from './new-experiencia.component';
import {NgbModal, ModalDismissReasons, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EditExperienciaComponent } from './edit-experiencia.component';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  //  inputExperiencia = new Experiencia

  //experiencia: Experiencia = null;

  experienciaList: Experiencia[] = [];
  closeResult: string;
  modalOptions:NgbModalOptions;
  // experienciaList: any;

  constructor(private router: Router,private activatedRoute: ActivatedRoute,private alertService: AlertService, private modalService: NgbModal, private experienciaService: ExperienciaService, private tokenService: TokenService) {

  }
private modalRef: NgbModalRef;

  isLogged = false;
  showToast = true;

  ngOnInit(): void {
    this.cargarExperiencia();
    if(this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

      // this.porfolioDatos.obtenerDatos().subscribe(data =>
      //   this.experienciaList = data.experience);

  }
  cargarExperiencia(): void {
    this.experienciaService.lista().subscribe(data => {this.experienciaList = data;})
  }

  borrar(id?: number): void {
    if (id !== undefined) {
      this.experienciaService.delete(id).subscribe(
        data => {
          this.cargarExperiencia();
        }, err => {
          alert("No se pudó eliminar.")
        }
      )
    }

  }

  open(componentName: string ) {
    const mapper = {
      'NewExperienciaComponent': NewExperienciaComponent,
      'EditExperienciaComponent': EditExperienciaComponent,
    }

    this.modalRef = this.modalService.open(mapper[componentName as keyof typeof mapper]);
    this.modalRef.result.then((result) => {
      this.cargarExperiencia();
      //new bootstrap.Toast(document.querySelector('#bt')).show();
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
      console.log(this.closeResult);


    }


    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }




    openEditModal(experiencia: any) {
      const modalRef = this.modalService.open(EditExperienciaComponent);
      modalRef.componentInstance.inputExperiencia = experiencia;

      this.modalRef.result.then((result) => {
        this.cargarExperiencia();
        //new bootstrap.Toast(document.querySelector('#bt')).show();
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        console.log(this.closeResult);
      }
}



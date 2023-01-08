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
import { HttpErrorResponse } from '@angular/common/http';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  //  inputExperiencia = new Experiencia

  //experiencia: Experiencia = null;

  closeResult: string;
  modalOptions:NgbModalOptions;
  public pepe: any = [];
  experienciaList: any[];
  // experienciaList: any;

  constructor(public utils: UtilsService,private router: Router,private activatedRoute: ActivatedRoute,private alertService: AlertService, private modalService: NgbModal, public experienciaService: ExperienciaService, private tokenService: TokenService) {



  }
  private modalRef: NgbModalRef;

  isLogged = false;
  showToast = true;



  ngOnInit(): void {
    // this.cargarExp(this.experienciaService, this.experienciaList)
    this.cargarExperiencia();
    // this.utils.cargar(this.experienciaService,this.experienciaList);
    if(this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

      // this.porfolioDatos.obtenerDatos().subscribe(data =>
      //   this.experienciaList = data.experience);

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
  } //

  borrar(id?: number): void {
    if (id !== undefined) {
      this.experienciaService.delete(id).subscribe({
        next: (data: Experiencia) => {
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
      this.cargarExperiencia();
      //  this.utils.cargar(this.experienciaService,this.experienciaList);
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

      modalRef.result.then((result) => {
         this.cargarExperiencia();
        //new bootstrap.Toast(document.querySelector('#bt')).show();
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
      this.cargarExperiencia();

          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        console.log(this.closeResult);
      }

}



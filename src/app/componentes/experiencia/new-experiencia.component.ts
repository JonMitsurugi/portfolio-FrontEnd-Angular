import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import {NgbModal, ModalDismissReasons, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-new-experiencia',
  templateUrl: './new-experiencia.component.html',
  styleUrls: ['./new-experiencia.component.css']
})
export class NewExperienciaComponent implements OnInit {

  title = 'ng-bootstrap-modal-demo';
  closeResult: string;
  modalOptions:NgbModalOptions;

  experiencia: Experiencia = null;

  nombreExp: string = '';
  fechaInicioExp?: number ;
  fechaFinExp?: number;
  rolExp: string = '';
  descripcionExp: string = '';


  constructor(private activatedRoute: ActivatedRoute,private alertService: AlertService,private modalService: NgbModal,public activeModal: NgbActiveModal, private experienciaService: ExperienciaService, private router: Router) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
   }
  // constructor(private experienciaService: ExperienciaService, private router: Router) { }

  modalReference: NgbModalRef;

  ngOnInit(): void {
  }

  onCreate(): void {
    const experiencia = new Experiencia(this.nombreExp, this.fechaInicioExp!, this.fechaFinExp!, this.rolExp, this.descripcionExp);
    this.experienciaService.save(experiencia).subscribe(data => {
      this.activeModal.close();
      this.alertService.showAlert("Experiencia añadida exitosamente", 7000, "exito");
      }, err => {
      this.activeModal.close();
      this.alertService.showAlert("La carga de la experiencia falló", 7000, "error");
      }
    )
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.experienciaService.update(id, this.experiencia).subscribe(
      data => {
        //this.router.navigate(['']);
      this.activeModal.close();
     this.alertService.showAlert("Experiencia actualizada exitosamente", 7000, "exito");
      }, err => {
        //this.activeModal.close();
      this.alertService.showAlert("Error al modificar experiencia", 7000, "error");
    })
  }


// open(content: any) {
//   this.modalService.open(content, this.modalOptions).result.then((result) => {
//     this.closeResult = `Closed with: ${result}`;
//   }, (reason) => {
//     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//   });
// }

// private getDismissReason(reason: any): string {
//   if (reason === ModalDismissReasons.ESC) {
//     return 'by pressing ESC';
//   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//     return 'by clicking on a backdrop';
//   } else {
//     return  `with: ${reason}`;
//   }
// }
}



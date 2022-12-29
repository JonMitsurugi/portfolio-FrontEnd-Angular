import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.css']
})
export class EditExperienciaComponent implements OnInit {

  @Input() inputExperiencia: Experiencia;


  //experiencia: Experiencia = null;
  modalOptions:NgbModalOptions;

 nombreExp: string = '';
 fechaInicioExp?: number ;
 fechaFinExp?: number;
 rolExp: string = '';
 descripcionExp: string = '';

  constructor(private alertService: AlertService,private experienciaService: ExperienciaService, private activatedRoute: ActivatedRoute, private router: Router, public activeModal: NgbActiveModal) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }  }

    ngOnInit(): void {
      // const id = this.activatedRoute.snapshot.params['id'];
      //  this.experienciaService.detail(this.inputExperiencia.id).subscribe(
      //     data => {
      //       this.inputExperiencia = data;
      //       alert("Hasta aca cargo bien.");
      //     }, err => {
      //       alert("Error al modificar experiencia AHHHHHH.");
      // })
    }

  onUpdate(): void {
    //const id = this.activatedRoute.snapshot.params['id'];
    this.experienciaService.update(this.inputExperiencia.id, this.inputExperiencia).subscribe(
      data => {
        //this.router.navigate(['']);
      this.activeModal.close(this.inputExperiencia);
     this.alertService.showAlert("Experiencia actualizada exitosamente", 7000, "exito");
      }, err => {
      this.activeModal.close(this.inputExperiencia);
      this.alertService.showAlert("Error al modificar experiencia", 7000, "error");
    })
  }

  // onCreate(): void {
  //   const experiencia = new Experiencia(this.nombreExp, this.fechaInicioExp!, this.fechaFinExp!, this.rolExp, this.descripcionExp);
  //   this.experienciaService.save(experiencia).subscribe(data => {
  //     this.activeModal.close();
  //     this.alertService.showAlert("Experiencia añadida exitosamente", 7000, "exito");
  //     }, err => {
  //     this.activeModal.close();
  //     this.alertService.showAlert("La carga de la experiencia falló", 7000, "error");
  //     }
  //   )
  // }

}

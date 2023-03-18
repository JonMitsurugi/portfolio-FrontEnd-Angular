import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-experiencia',
  templateUrl: './new-experiencia.component.html',
  styleUrls: ['./new-experiencia.component.css']
})
export class NewExperienciaComponent implements OnInit {

  isSubmitting = false;
  buttonText = 'Enviar';
  crudForm: FormGroup;
  modalOptions:NgbModalOptions;

  experiencia: Experiencia = null;




  constructor(private alertService: AlertService,public activeModal: NgbActiveModal, private experienciaService: ExperienciaService, private formBuilder: FormBuilder) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }

  modalReference: NgbModalRef;

  ngOnInit(): void {
    this.crudForm = this.formBuilder.group({
      nombreExp: ['', Validators.required],
      fechaInicioExp: ['', Validators.required],
      fechaFinExp: '',
      rolExp: ['', Validators.required],
      descripcionExp: ['', Validators.required],
    })
  }

  onCreate(): void {
    if (!this.crudForm.valid) {
      event.preventDefault();
      event.stopPropagation();
      this.crudForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.buttonText = ' Enviando...';

    const experiencia = this.crudForm.value;
    this.experienciaService.save(experiencia).subscribe(
      (next) => {
      this.activeModal.close();
      this.alertService.showAlert("Experiencia añadida exitosamente", 7000, "exito");
      },
      (err: HttpErrorResponse) => {
      //alert(err.message);
      console.log(err.message);
        this.activeModal.dismiss();
      this.alertService.showAlert("La carga de la experiencia falló", 7000, "error");

    })
  }

  checkNumberFieldLength(elem: any){
    let filterValue = (elem.target as HTMLInputElement).value;
    if (filterValue.length > 4) {
        filterValue = filterValue.slice(0,4);
    }
}
}



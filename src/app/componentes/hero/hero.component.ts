import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona.model';
import { PersonaService } from 'src/app/services/persona.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from 'src/app/services/token.service';
import { UtilsService } from 'src/app/services/utils.service';
import { EditHeroComponent } from './edit-hero.component';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'] ,
  providers: [ PersonaService]
})
export class HeroComponent implements OnInit {

  miPorfolio: any;
  persona: Persona = null;
  private modalRef: NgbModalRef;
  isLogged = false;
  closeResult: string;

  constructor(public personaService: PersonaService,  public utils: UtilsService, private modalService: NgbModal, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.personaService.detail(1).subscribe(data => this.persona = data);

    if(this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarPersona(): void {
    this.personaService.detail(1).subscribe({
      next: (data: Persona) => {
        console.log(data);
        this.persona = data;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  editModal(persona: any) {
    const modalRef = this.modalService.open(EditHeroComponent);
    modalRef.componentInstance.inputPersona = persona;

    modalRef.result.then((result) => {
      this.cargarPersona();
      }, (reason) => {
      this.cargarPersona();
      });
  }
}

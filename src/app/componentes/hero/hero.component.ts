import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona.model';
import { PersonaService } from 'src/app/services/persona.service';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Habilidad } from 'src/app/models/habilidad';
import { HabilidadService } from 'src/app/services/habilidad.service';
import { TokenService } from 'src/app/services/token.service';
import { UtilsService } from 'src/app/services/utils.service';
import { EditHeroComponent } from './edit-hero.component';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'] ,
  providers: [ PersonaService, PorfolioService]
})
export class HeroComponent implements OnInit {

   miPorfolio: any;
/*
  constructor(private datosPorfolio: PorfolioService) { }

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatos().subscribe(data => this.miPorfolio = data);

    ;
  } */

  persona: Persona = null;
  // persona: Persona = new Persona('','','','','');
  private modalRef: NgbModalRef;
  isLogged = false;
  closeResult: string;

  constructor(public personaService: PersonaService, private datosPorfolio: PorfolioService, public utils: UtilsService, private modalService: NgbModal, public habilidadService: HabilidadService, private tokenService: TokenService) { }

  ngOnInit(): void {
    // this.datosPorfolio.obtenerDatos().subscribe(data => this.miPorfolio = data);
    this.personaService.detail(1).subscribe(data => this.persona = data);
    // this.personaService.getPersona().subscribe(data => this.persona = data);

    if(this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarPersona(): void {
    // this.personaService.getPersona().subscribe({
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

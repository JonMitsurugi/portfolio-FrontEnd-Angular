import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona.model';
import { PersonaService } from 'src/app/services/persona.service';
import { PorfolioService } from 'src/app/services/porfolio.service';

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

  persona: Persona = new Persona('','','','','');


  constructor(public personaService: PersonaService, private datosPorfolio: PorfolioService) { }

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatos().subscribe(data => this.miPorfolio = data);
    this.personaService.getPersona().subscribe(data => this.persona = data);
  }

}

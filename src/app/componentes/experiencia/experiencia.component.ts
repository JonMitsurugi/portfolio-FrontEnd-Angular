import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { PorfolioService } from 'src/app/services/porfolio.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  experienciaList: Experiencia[] = [];

  // experienciaList: any;

  constructor(private experienciaService: ExperienciaService, private tokenService: TokenService) { }

  isLogged = false;

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
}

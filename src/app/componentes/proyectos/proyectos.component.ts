import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/services/porfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectoList: any;

  constructor(private porfolioDatos: PorfolioService) { }

  ngOnInit(): void {
    this.porfolioDatos.obtenerDatos().subscribe(data =>
      this.proyectoList = data.projects);
  }

}

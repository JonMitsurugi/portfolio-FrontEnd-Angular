import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/services/porfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  experienciaList: any;

  constructor(private porfolioDatos: PorfolioService) { }

  ngOnInit(): void {

      this.porfolioDatos.obtenerDatos().subscribe(data =>
        this.experienciaList = data.experience);

  }
}

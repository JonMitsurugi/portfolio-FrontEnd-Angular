import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';

@Component({
  selector: 'app-new-experiencia',
  templateUrl: './new-experiencia.component.html',
  styleUrls: ['./new-experiencia.component.css']
})
export class NewExperienciaComponent implements OnInit {

  nombreExp: string = '';
  fechaInicioExp: number = 0;
  fechaFinExp?: number;
  rolExp: string = '';
  descripcionExp: string = '';


  constructor(private experienciaService: ExperienciaService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const experiencia = new Experiencia(this.nombreExp, this.fechaInicioExp, this.fechaFinExp!, this.rolExp, this.descripcionExp);
    this.experienciaService.save(experiencia).subscribe(data => {
      alert("Experiencia añadida");
      this.router.navigate(['']);
  }, err => { alert("falló");
    this.router.navigate(['']);})
}
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

anioActual: number;

  constructor() { }

  ngOnInit(): void {

    this.anioActual = new Date().getFullYear();

    // Actualiza el año cada 50 minutos (3000000 milisegundos)
    setInterval(() => {
      this.anioActual = new Date().getFullYear();
    }, 3000000);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}

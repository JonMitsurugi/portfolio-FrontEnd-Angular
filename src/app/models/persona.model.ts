
export class Persona {
  id?: number;
  nombre: string;
  apellido: string;
  descripcion: string;
  imgFondo: string;
  imgPerfil: string;

  constructor(nombre: string, apellido: string, descripcion: string, imgFondo: string, imgPerfil: string) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.descripcion = descripcion;
    this.imgFondo = imgFondo;
    this.imgPerfil = imgPerfil;
  }
}

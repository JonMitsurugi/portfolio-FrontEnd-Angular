export class Experiencia {
  id? : number;
  nombreExp: string;
  fechaInicioExp: number;
  fechaFinExp: number;
  rolExp: string;
  descripcionExp: string;

  constructor(nombreExp: string, fechaInicioExp: number, fechaFinExp: number, rolExp: string, descripcionExp: string) {
    this.nombreExp = nombreExp;
    this.fechaInicioExp = fechaInicioExp;
    this.fechaFinExp = fechaFinExp;
    this.rolExp = rolExp;
    this.descripcionExp = descripcionExp;
  }
}

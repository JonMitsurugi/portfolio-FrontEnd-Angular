export class Estudio {
  id? : number;
  nombreEst: string;
  urlImgEst: string;
  fechaInicioEst?: number;
  fechaFinEst?: number;
  lugarEst: string;
  descripcionEst: string;

  constructor(nombreEst: string, urlImgEst: string, fechaInicioEst: number, fechaFinEst: number, lugarEst: string, descripcionEst: string ) {
    this.nombreEst = nombreEst;
    this.urlImgEst = urlImgEst;
    this.fechaInicioEst = fechaInicioEst;
    this.fechaFinEst = fechaFinEst;
    this.lugarEst = lugarEst;
    this.descripcionEst = descripcionEst;
  }

}

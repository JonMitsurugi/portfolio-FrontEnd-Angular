export class Habilidad {
  id?: number;
  nombreHab: string;
  urlImgHab: string;
  descripcionHab: string;
  progresoHab: number;

  constructor(nombreHab: string, urlImgHab: string, descripcionHab: string, progresoHab: number) {
    this.nombreHab = nombreHab;
    this.urlImgHab = urlImgHab;
    this.descripcionHab = descripcionHab;
    this.progresoHab = progresoHab;
  }
}

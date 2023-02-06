export class Habilidad {
  id?: number;
  nombreHab: string;
  urlImgHab: string;

  constructor(nombreHab: string, urlImgHab: string) {
    this.nombreHab = nombreHab;
    this.urlImgHab = urlImgHab;
  }
}

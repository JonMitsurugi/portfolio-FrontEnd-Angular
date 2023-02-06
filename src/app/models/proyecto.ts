export class Proyecto {
  id? : number;
  nombrePro: string;
  tipoPro: string;
  urlPro: string;
  descripcionPro: string;

  constructor(nombrePro: string, tipoPro: string, urlPro: string, descripcionPro: string) {
    this.nombrePro = nombrePro;
    this.tipoPro = tipoPro;
    this.urlPro = urlPro;
    this.descripcionPro = descripcionPro;
  }
}

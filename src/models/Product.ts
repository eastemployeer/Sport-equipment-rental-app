export interface IRodzaj {
  nazwa: string;
  rodzajSezonu: string;
}

export interface IProduct {
  id: number;
  rodzajSprzetu: IRodzaj;
  przeznaczenie: string;
  cenaWypozyczeniaDzien: number;
  cecha1Label: string;
  cecha1Value: string;
  cecha2Label: string;
  cecha2Value: string;
  cecha3Label: string;
  cecha3Value: string;
  cecha4Label: string;
  cecha4Value: string;
  blokada: string;
  rocznik: string;
  wartoscSprzetu: number;
}

export default class Product {
  id?: number;

  rodzajSprzetu?: IRodzaj;

  przeznaczenie?: string;

  cenaWypozyczeniaDzien?: number;

  cecha1Label?: string;

  cecha1Value?: string;

  cecha2Label?: string;

  cecha2Value?: string;

  cecha3Label?: string;

  cecha3Value?: string;

  cecha4Label?: string;

  cecha4Value?: string;

  blokada?: string;

  rocznik?: string;

  wartoscSprzetu?: number;

  constructor(data?: IProduct) {
    this.id = data?.id;
    this.rodzajSprzetu = data?.rodzajSprzetu;
    this.przeznaczenie = data?.przeznaczenie;
    this.cenaWypozyczeniaDzien = data?.cenaWypozyczeniaDzien;
    this.cecha1Label = data?.cecha1Label;
    this.cecha1Value = data?.cecha1Value;
    this.cecha2Label = data?.cecha2Label;
    this.cecha2Value = data?.cecha2Value;
    this.cecha3Label = data?.cecha3Label;
    this.cecha3Value = data?.cecha3Value;
    this.cecha4Label = data?.cecha4Label;
    this.cecha4Value = data?.cecha4Value;
    this.blokada = data?.blokada;
    this.rocznik = data?.rocznik;
    this.wartoscSprzetu = data?.wartoscSprzetu;
  }
}

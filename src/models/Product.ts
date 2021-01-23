export interface IRodzaj {
  nazwa: string;
  rodzajSezonu: string | null;
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
  iloscWypozyczen: number;
  iloscNapraw: number;
  opisNapraw: string;
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

  opisKary?: string;

  kara?: number;

  iloscNapraw?: number;

  iloscWypozyczen?: number;

  opisNapraw?: number;

  constructor(data?: IProduct | any) {
    this.id = data?.id;
    this.rodzajSprzetu = (data?.rodzajSprzetu || data?.rodzaj_sprzetu) && (data?.rodzajSprzetu || data?.rodzaj_sprzetu) ? {
      nazwa: data?.rodzaj_sprzetu || data?.rodzajSprzetu,
      rodzajSezonu: data?.rodzaj_sezonu || data?.rodzajSezonu,
    } : undefined;
    this.przeznaczenie = data?.przeznaczenie;
    this.cenaWypozyczeniaDzien = data?.cenaWypozyczeniaDzien || data?.cena_wypozyczenia_dzien;
    this.cecha1Label = data?.cecha1Label || data?.cecha_1_label;
    this.cecha1Value = data?.cecha1Value || data?.cecha_1_value;
    this.cecha2Label = data?.cecha2Label || data?.cecha_2_label;
    this.cecha2Value = data?.cecha2Value || data?.cecha_2_value;
    this.cecha3Label = data?.cecha3Label || data?.cecha_3_label;
    this.cecha3Value = data?.cecha3Value || data?.cecha_3_value;
    this.cecha4Label = data?.cecha4Label || data?.cecha_4_label;
    this.cecha4Value = data?.cecha4Value || data?.cecha_4_value;
    this.blokada = data?.blokada;
    this.rocznik = data?.rocznik;
    this.wartoscSprzetu = data?.wartoscSprzetu || data?.wartosc_sprzetu;
    this.kara = data?.kara;
    this.opisKary = data?.opisKary || data?.opis_kary;
    this.opisNapraw = data?.opisNapraw || data?.opis_napraw;
    this.iloscNapraw = data?.iloscNapraw || data?.ilosc_napraw;
    this.iloscWypozyczen = data?.iloscWypozyczen || data?.ilosc_wypozyczen;
  }

  public getCechyArray() {
    return [
      {
        label: this.cecha1Label,
        value: this.cecha1Value,
      },
      {
        label: this.cecha2Label,
        value: this.cecha2Value,
      },
      {
        label: this.cecha3Label,
        value: this.cecha3Value,
      },
      {
        label: this.cecha4Label,
        value: this.cecha4Value,
      },
    ];
  }
}

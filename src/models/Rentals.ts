import { IProduct } from './Product';

export interface IRentalSprzet extends IProduct {
  kara: number;
  opisKary: string;
}

export interface IRentals {
  id: number,
  klientId: number,
  poczatek: Date,
  koniec: Date,
  koszt: number,
  naliczonaKaucja: number,
  status: string,
  imie: string,
  nazwisko: string,
  email: string,
  telefon: string,
  sprzet: IRentalSprzet[];
}

export default class Rentals implements IRentals {
  id: number;

  klientId: number;

  poczatek: Date;

  koniec: Date;

  koszt: number;

  naliczonaKaucja: number;

  status: string;

  imie: string;

  nazwisko: string;

  email: string;

  telefon: string;

  sprzet: IRentalSprzet[];

  constructor(data?: any) {
    this.id = data.id;
    this.klientId = data.klient_id || data.klientId;
    this.poczatek = data.poczatek;
    this.koniec = data.koniec;
    this.koszt = data.koszt;
    this.naliczonaKaucja = data.naliczona_kaucja || data.naliczonaKaucja;
    this.status = data.status;
    this.imie = data.imie;
    this.nazwisko = data.nazwisko;
    this.email = data.email;
    this.telefon = data.telefon;
    this.sprzet = data.sprzet;
  }

  get kara() {
    let counter = 0;

    for (let i = 0; i < this.sprzet.length; i++) {
      counter += this.sprzet[i].kara;
    }

    return counter;
  }
}

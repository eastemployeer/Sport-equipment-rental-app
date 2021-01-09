import Product, { IProduct } from './Product';

export interface IRentalsProducts extends IProduct {
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
  sprzety: IRentalsProducts[];
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

  sprzety: IRentalsProducts[];

  constructor(data?: IRentals | any) {
    this.id = data?.id;
    this.klientId = data?.klient_id || data?.klientId;
    this.poczatek = new Date(data?.poczatek);
    this.koniec = new Date(data?.koniec);
    this.koszt = data?.koszt;
    this.naliczonaKaucja = data?.naliczona_kaucja || data?.naliczonaKaucja;
    this.status = data?.status;
    this.imie = data?.imie;
    this.nazwisko = data?.nazwisko;
    this.email = data?.email;
    this.telefon = data?.telefon;
    this.sprzety = data?.sprzet ? data?.sprzet.map((sprzet: any) => new Product(sprzet)) : [];
  }

  get kara() {
    let counter = 0;

    for (let i = 0; i < this.sprzety.length; i++) {
      counter += this.sprzety[i].kara;
    }

    return counter;
  }

  public get totalPrice() {
    let totalPrice = 0;
    const difference = Math.abs(this.poczatek.getTime() - this.koniec.getTime());
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    totalPrice = this.priceForDay * days;

    return totalPrice;
  }

  public get priceForDay() {
    let counter = 0;

    this.sprzety.forEach(sprzet => {
      counter += sprzet.cenaWypozyczeniaDzien!;
    });

    return counter;
  }

  public get formatedPoczatek() {
    return this.poczatek.toLocaleDateString('pl', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  public get formatedKoniec() {
    return this.koniec.toLocaleDateString('pl', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  public calculateFinancialPenalty() {
    let counter = 0;

    this.sprzety.forEach(sprzet => {
      counter += +sprzet.kara || 0;
    });

    return counter;
  }

  public getFormatedPenaltyDescription() {
    let description = '';

    this.sprzety.forEach(sprzet => {
      if (sprzet.opisKary) { description += `${sprzet.rodzajSprzetu.nazwa} - ${sprzet.opisKary}&#13;&#10;`; }
    });

    if (description === '') { return 'brak'; }

    return description;
  }
}

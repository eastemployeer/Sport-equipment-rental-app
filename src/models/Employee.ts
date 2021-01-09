export interface IEmployee {
  id: number;
  typKonta: string;
  imie: string;
  nazwisko: string;
  login: string;
  haslo: string;
  blokada: number
}

export default class Employee {
  id?: number;

  typKonta?: string;

  imie?: string;

  nazwisko?: string;

  login?: string;

  haslo?: string;

  blokada?: number;

  constructor(data?: IEmployee | any) {
    this.id = data?.id;
    this.typKonta = data?.typKonta || data?.typ_konta;
    this.imie = data?.imie;
    this.nazwisko = data?.nazwisko;
    this.login = data?.login;
    this.haslo = data?.haslo;
    this.blokada = data?.blokada;
  }
}

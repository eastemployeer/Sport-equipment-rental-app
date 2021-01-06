export interface IService {
  id: number;
  nazwa: string;
  szacowanyCzasWykonania: number;
  cena: number;
}

export default class Service {
  id?: number;

  nazwa?: string;

  szacowanyCzasWykonania?: number;

  cena?: number;

  constructor(data?: IService | any) {
    this.id = data?.id;
    this.nazwa = data?.nazwa;
    this.szacowanyCzasWykonania = data?.szacowany_czas_wykonania || data?.szacowanyCzasWykonania;
    this.cena = data?.cena;
  }
}

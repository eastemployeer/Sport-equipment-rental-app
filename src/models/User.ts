export interface User {
  id: number;
  email?: string;
  login?: string;
  imie: string;
  nazwisko: string;
  typKonta?: string;
}

export type AccountType = 'KLIENT' | 'PRACOWNIK' | 'SERWISANT' |'KIEROWNIK';

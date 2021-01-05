import { AccountType, User } from '@/models/User';

import API from './API';

export interface LoginResponse {
  token: string;
  user: User;
  accountType: AccountType;
  status: number;
}

export interface LoginKlientRequest {
  email?: string;
  password: string;
}

export interface LoginPracownikRequest {
  login: string;
  password: string;
}

export class AuthService {
  public static async loginKlient(data: LoginKlientRequest): Promise<LoginResponse> {
    const res = await new API('post', 'login/klient', {
      body: {
        password: data.password,
        email: data.email,
      },
    }).call(true);

    const response: LoginResponse = {
      token: res.data.token,
      user: res.data.user,
      accountType: 'KLIENT',
      status: res.status,
    };

    return response;
  }

  public static async loginPracownik(data: LoginPracownikRequest): Promise<LoginResponse> {
    const res = await new API('post', 'login/pracownik', {
      body: {
        password: data.password,
        login: data.login,
      },
    }).call(true);

    const response: LoginResponse = {
      token: res.data.token,
      user: res.data.user,
      accountType: res.data.user.typ_konta,
      status: res.status,
    };

    return response;
  }
}

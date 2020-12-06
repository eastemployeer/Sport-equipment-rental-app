import axios, { AxiosPromise } from 'axios';

import { User } from '@/models/User';
import { PATH_LOGIN } from '@/paths';

export interface LoginResponse {
    token: string;
    user: User;
}

export class AuthService {
  public static login(data: any): AxiosPromise<LoginResponse> {
    return axios.post(PATH_LOGIN, data);
  }
}

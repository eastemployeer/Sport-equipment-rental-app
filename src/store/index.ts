import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import AuthModule, { AuthState } from '@/store/modules/AuthModule';

import CartModule, { CartState } from './modules/CartModule';

export interface RootState {
  auth: AuthState;
  cart: CartState;
}

const vuexLocal = new VuexPersistence<RootState>({
  storage: window.localStorage,
  modules: ['auth', 'cart'],
});

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  modules: {
    auth: AuthModule,
    cart: CartModule,
  },
  plugins: [vuexLocal.plugin],
});

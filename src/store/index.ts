import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import AuthModule, { AuthState } from '@/store/modules/AuthModule';

export interface RootState {
  auth: AuthState;
}

const vuexLocal = new VuexPersistence<RootState>({
  storage: window.localStorage,
  modules: ['auth'],
});

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  modules: {
    auth: AuthModule,
  },
  plugins: [vuexLocal.plugin],
});

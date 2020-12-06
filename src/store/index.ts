import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import AuthModule, { AuthState } from '@/store/modules/AuthModule';
import LocalizationModule, { LocalizationState } from '@/store/modules/LocalizationModule';

export interface RootState {
    auth: AuthState;
    localization: LocalizationState;
}

const vuexLocal = new VuexPersistence<RootState>({
  storage: window.localStorage,
  modules: ['auth', 'localization'],
});

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  modules: {
    auth: AuthModule,
    localization: LocalizationModule,
  },
  plugins: [vuexLocal.plugin],
});

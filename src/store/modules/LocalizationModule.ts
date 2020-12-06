import {
  Action, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';

export enum SupportedLocale {
    DE = 'de',
    EN = 'en',
}

export interface LocalizationState {
    locale: SupportedLocale;
}

@Module
export default class LocalizationModule extends VuexModule<LocalizationState> {
    public locale: SupportedLocale = SupportedLocale.EN;

    get currentLocale(): SupportedLocale {
      return this.locale;
    }

    @Mutation
    private changeLocaleHandler(locale: SupportedLocale) {
      this.locale = locale;
    }

    @Action({ commit: 'changeLocaleHandler', rawError: true })
    private changeLocale(locale: SupportedLocale) {
      return locale;
    }
}

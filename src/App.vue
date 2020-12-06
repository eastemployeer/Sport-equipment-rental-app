<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import { SupportedLocale } from './store/modules/LocalizationModule';

const defaultLayout = 'default';

@Component
export default class App extends Vue {
  get locale(): SupportedLocale {
    return this.$store.getters.currentLocale;
  }

  get layout() {
    return `${(this.$route.meta as any).layout || defaultLayout}-layout`;
  }

  public mounted() {
    this.$i18n.locale = this.locale;
  }

  @Watch('locale')
  public onLocaleChange(locale: SupportedLocale) {
    this.$i18n.locale = locale;
  }
}
</script>

<style lang="scss">
  // Normalize default styles across browsers,
  // https://necolas.github.io/normalize.css/
  @import '~normalize.css/normalize.css';
  // Style loading bar between pages.
  // https://github.com/rstacruz/nprogress
  @import '~nprogress/nprogress.css';

  @import './style/theme';

  @import 'node_modules/bootstrap/scss/bootstrap.scss';
  @import 'node_modules/bootstrap-vue/src/index.scss';
</style>

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vue from 'vue';
import Component from 'vue-class-component';

import DefaultLayout from '@/layouts/DefaultLayout.vue';

import App from './App.vue';
import router from './router';
import store from './store';

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

// Allow vue-router-hooks to be accessed in a component
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);

// Layout-init
Vue.component('default-layout', DefaultLayout);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

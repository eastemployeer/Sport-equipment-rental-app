import Vue from 'vue';
import Router, { Route } from 'vue-router';

import store from '@/store';
import ProductList from '@/views/products/List.vue';

const ifNotAuthenticated = (to: Route, from: Route, next: (route?: any) => void) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next({ name: 'home' });
};

const ifAuthenticated = (to: Route, from: Route, next: (route?: any) => void) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ProductList,
    },
  ],
});

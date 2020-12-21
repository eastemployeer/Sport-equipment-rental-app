import Vue from 'vue';
import Router from 'vue-router';

import store from '@/store';
import Login from '@/views/auth/Login.vue';
import MyCart from '@/views/clients/MyCart.vue';
import ProductList from '@/views/products/List.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        layout: 'auth',
      },
    },
    {
      path: '/product',
      name: 'ProductList',
      component: ProductList,
    },
    {
      path: '/cart',
      name: 'MyCart',
      component: MyCart,
    },
  ],
});

router.beforeEach((to, _from, next) => {
  if (!store.state.auth.token && to.name !== 'Login') {
    next({ name: 'Login' });
  } else if (store.state.auth.token && to.name === 'Login') {
    next({ name: 'ProductList' });
  } else {
    next();
  }
});

export default router;

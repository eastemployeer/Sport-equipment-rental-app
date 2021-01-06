import Vue from 'vue';
import Router from 'vue-router';

import store from '@/store';
import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';
import MyCart from '@/views/clients/MyCart.vue';
import ProductCreate from '@/views/products/Create.vue';
import ProductDetails from '@/views/products/Details.vue';
import ProductEdit from '@/views/products/Edit.vue';
import ProductList from '@/views/products/List.vue';
import ProductRepair from '@/views/products/Repair.vue';
import ServiceList from '@/views/products/ServiceList.vue';
import RentalsList from '@/views/rentals/List.vue';

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
      path: '/product/create',
      name: 'ProductCreate',
      component: ProductCreate,
    },
    {
      path: '/product/repair',
      name: 'ProductRepair',
      component: ProductRepair,
    },
    {
      path: '/product/edit/:id',
      name: 'ProductEdit',
      component: ProductEdit,
    },
    {
      path: '/product/:id',
      name: 'ProductDetails',
      component: ProductDetails,
    },
    {
      path: '/servicelist',
      name: 'ServiceList',
      component: ServiceList,
    },
    {
      path: '/rentals',
      name: 'RentalsList',
      component: RentalsList,
    },
    {
      path: '/cart',
      name: 'MyCart',
      component: MyCart,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        layout: 'auth',
      },
    },
  ],
});

router.beforeEach((to, _from, next) => {
  if (!store.state.auth.token && (to.name !== 'Login' && to.name !== 'Register')) {
    next({ name: 'Login' });
  } else if (store.state.auth.token && (to.name === 'Login' || to.name === 'Register')) {
    next({ name: 'ProductList' });
  } else {
    next();
  }
});

export default router;

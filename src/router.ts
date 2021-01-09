import Vue from 'vue';
import Router from 'vue-router';

import store from '@/store';
import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';
import MyCart from '@/views/clients/MyCart.vue';
import CreateEmployee from '@/views/employees/CreateEmployee.vue';
import EditEmployee from '@/views/employees/EditEmployee.vue';
import EmployeesList from '@/views/employees/EmployeesList.vue';
import ClientServiceCreate from '@/views/maintenanceServices/ClientServiceCreate.vue';
import ClientServiceList from '@/views/maintenanceServices/ClientServiceList.vue';
import ClientServiceListDetails from '@/views/maintenanceServices/ClientServiceListDetails.vue';
import CreateService from '@/views/maintenanceServices/CreateService.vue';
import EditService from '@/views/maintenanceServices/EditService.vue';
import ServiceList from '@/views/maintenanceServices/ServiceList.vue';
import ProductCreate from '@/views/products/Create.vue';
import ProductDetails from '@/views/products/Details.vue';
import ProductEdit from '@/views/products/Edit.vue';
import ProductList from '@/views/products/List.vue';
import ProductRepair from '@/views/products/Repair.vue';
import RentalsDetails from '@/views/rentals/Details.vue';
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
      path: '/servicelist/:id',
      name: 'EditService',
      props: true,
      component: EditService,
    },
    {
      path: '/servicelist/create',
      name: 'CreateService',
      props: true,
      component: CreateService,
    },
    {
      path: '/myservicelist',
      name: 'ClientServiceList',
      component: ClientServiceList,
    },
    {
      path: '/myservicelist/create',
      name: 'ClientServiceCreate',
      component: ClientServiceCreate,
    },
    {
      path: '/myservicelist/:id',
      name: 'ClientServiceListDetails',
      component: ClientServiceListDetails,
    },
    {
      path: '/employees',
      name: 'EmployeesList',
      component: EmployeesList,
    },
    {
      path: '/employees/create',
      name: 'CreateEmployee',
      component: CreateEmployee,
    },
    {
      path: '/employees/:id',
      name: 'EditEmployee',
      component: EditEmployee,
    },
    {
      path: '/rentals',
      name: 'RentalsList',
      component: RentalsList,
    },
    {
      path: '/rentals/:id',
      name: 'RentalsDetails',
      component: RentalsDetails,
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

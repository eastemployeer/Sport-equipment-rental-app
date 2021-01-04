import {
  Action, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';

import { Product } from '@/models/Product';

export interface CartState {
  currentCart: Product[] | null;
}

@Module
export default class CartModule extends VuexModule<CartState> {
    public currentCart: Product[] | null = null;

    @Mutation
    public addToCart(data: Product) {
      this.currentCart?.push(data);
    }

    getCart(state: CartState) {
      return state.currentCart;
    }
}

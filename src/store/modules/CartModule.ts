import {
  Action,
  Module, Mutation, VuexModule,
} from 'vuex-module-decorators';

import { Product } from '@/models/Product';

export enum CartAction {
  IsProductInCart = 'isProductInCart'
}

export interface CartState {
  products: Product[];
}

@Module
export default class CartModule extends VuexModule<CartState> {
    public products: Product[] = [];

    @Mutation
    private addToCart(data: Product) {
      this.products.push(data);
    }

    @Action
    private async [CartAction.IsProductInCart](productId: number) {
      return this.products.some(product => product.id === productId);
    }
}

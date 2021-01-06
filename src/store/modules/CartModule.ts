import {
  Action,
  Module, Mutation, VuexModule,
} from 'vuex-module-decorators';

import Product from '@/models/Product';

// eslint-disable-next-line no-shadow
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

    @Mutation
    private removeFromCart(data: Product) {
      const index = this.products.findIndex(object => object.id === data.id);
      this.products.splice(index, 1);
    }

    @Mutation
    private clearCart() {
      this.products = [];
    }
}

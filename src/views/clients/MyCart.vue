<template>
<div class="container">
  <div class="view list text-center" ref="table">
      <div class="list-table">
        <b-table sticky-header hover head-variant="light"
          id="my-table"
          :style="{ maxHeight: parentHeight - 16 - 38 + 'px' }"
          :fields="fields"
          :items="products"
          :busy="isLoading"
        >
          <template #table-busy>
            <div class="text-center text-danger">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Ładowanie...</strong>
            </div>
          </template>

          <template #cell(cena_wypozyczenia_dzien)="data">
            <div class="text-center">
              {{ data.value + " zł" }}
            </div>
          </template>

          <template #cell(cecha_1)="data">
            {{ data.item.cecha_1_label ? data.item.cecha_1_label + ": " + data.item.cecha_1_value : "" }}
          </template>
          <template #cell(cecha_2)="data">
            {{ data.item.cecha_2_label ? data.item.cecha_2_label + ": " + data.item.cecha_2_value : "" }}
          </template>
          <template #cell(cecha_3)="data">
            {{ data.item.cecha_3_label ? data.item.cecha_3_label + ": " + data.item.cecha_3_value : "" }}
          </template>
          <template #cell(cecha_4)="data">
            {{ data.item.cecha_4_label ? data.item.cecha_4_label + ": " + data.item.cecha_4_value : "" }}
          </template>

          <template #cell(id)="data">
          <!-- router -->
              <b-icon-trash v-on:click="deleteItem(data.item)" variant="danger" scale="1.5"/>
          </template>
        </b-table>
      </div>
    </div>
  <div class="contentContainer">
    <div class="smallContentContainer">
        <div class="form-group row">
          <div class="col-md-6">
            <div class="textInfoLabel">Suma koszyka</div>
            <div class="textInfoValue">{{priceForDay}} zł dziennie</div>
          </div>
          <div class="col-md-6">
            <div class="textInfoLabel">Kaucja</div>
            <div class="textInfoValue">{{deposit}} zł</div>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-6">
            <div class="textInfoLabel">Data odebrania sprzętu</div>
            <input :value="dateToYYYYMMDD(takeDate)" @input="takeDate = $event.target.valueAsDate" class="textInfoValue form-control" type="date" placeholder="10-11-2020"/>
          </div>
          <div class="col-md-6">
            <div class="textInfoLabel">Data oddania sprzętu</div>
            <input type="date" :value="dateToYYYYMMDD(giveBackDate)" @input="giveBackDate = $event.target.valueAsDate" class="textInfoValue form-control" placeholder="15-11-2020"/>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-6">
            <div class="textInfoLabel">Koszt całej rezerwacji bez kaucji</div>
            <div class="textInfoValue">{{totalPrice}} zł</div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 btnStyle">
              <button type="button" class="btn btn-primary" v-on:click="reserve">Rezerwuj sprzęt</button>
          </div>
        </div>
    </div>
    <div class="smallContentContainer">
      <div class="messageBox mx-auto">
        <strong style="font-size: 16px;">Rezerwacja</strong>
        <p style="font-size: 14px;">Po dokonaniu rezerwacji prosimy o przelew na konto XXXXXXX z tytułem dzień wypożyczenia oraz Twoje nazwisko</p>
      </div>
    </div>
  </div>
</div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';

import { Product } from '@/models/Product';
import EventBus from '@/services/EventBus';
import store from '@/store';

@Component
export default class MyCart extends Vue {
   private parentHeight = 0;

   private takeDate : Date = new Date('2021-01-11T00:01:01Z');

   private giveBackDate : Date = new Date('2021-01-12T00:01:01Z');

  private currentPage = 1;

  private totalRows = 0;

  private value = 0;

  private isLoading = false;

  private products: any[] = [];

  private fields: any[] = [];

  private mounted() {
    this.setViewTitle();
    this.parentHeight = (this.$refs.table as any).offsetHeight;
    this.fields = [
      { key: 'rodzaj_sprzetu', label: 'Nazwa' },
      { key: 'cena_wypozyczenia_dzien', label: 'Cena za dzień' },
      { key: 'cecha_1', label: 'Cecha' },
      { key: 'cecha_2', label: 'Cecha' },
      { key: 'cecha_3', label: 'Cecha' },
      { key: 'cecha_4', label: 'Cecha' },
      { key: 'id', label: '' },
    ];
    this.loadProducts();
  }

  private dateToYYYYMMDD(d: Date) {
    // alternative implementations in https://stackoverflow.com/q/23593052/1850609
    return d && new Date(d.getTime() - (d.getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0];
  }

  private get priceForDay() {
    this.products.forEach(element => {
      this.value += element.cena_wypozyczenia_dzien;
    });
    return this.value;
  }

  private get deposit() {
    let deposit = 0;
    let value = 0;
    this.products.forEach(element => {
      value += element.wartosc_sprzetu;
    });
    if (value <= 200) {
      deposit = 200;
    } else if (value > 200 && value <= 500) {
      deposit = 200;
    } else {
      deposit = 400;
    }
    return deposit;
  }

  private get totalPrice() {
    let totalPrice = 0;
    const difference = this.giveBackDate.getTime() - this.takeDate.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    totalPrice = this.value * days;

    return totalPrice;
  }

  private reserve() {

  }

  private deleteItem(product: Product) {
    this.$store.commit('removeFromCart', product);
    this.loadProducts();
    this.value = 0;
  }

  private loadProducts() {
    this.products = store.state.cart.products;
  }

  private async setViewTitle() {
    await EventBus.$emit('layout-view', { title: 'Twój koszyk' });
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
}
.contentContainer {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  width: 100%;
  margin-top: 30px;
}
.messageBox {
box-sizing: border-box;
width: 378px;
height: 126px;
padding: 16px;

/* Daybreak Blue / blue-1 */
background: #E6F7FF;

/* Daybreak Blue / blue-3 */
border: 1px solid #91D5FF;
border-radius: 4px;
}
.btnStyle {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.smallContentContainer {
  display: flex;
  flex-direction: column;
  align-content: space-between;
  justify-content: space-around;
  width: 50%;
}
.buttons {
  display: flex;
  flex-direction: row;
  height: 38px;
}
</style>

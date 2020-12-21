<template>
  <div class="view">
    <div class="infoSegment">
      <div class='column'>
        <div class="textInfoContainer">
          <span class="textInfoLabel">Nazwa</span>
          <span class="textInfoValue">{{ product.nazwa }}</span>
        </div>
        <div class="textInfoContainer" :style="{ marginTop: '23px' }">
          <span class="textInfoLabel">Cena za dzień</span>
          <span class="textInfoValue">{{ product.cena_wypozyczenia_dzien + ' zł'}}</span>
        </div>
      </div>
      <div class='column' :style="{ flex: 3 }">
        <div class="textInfoContainer">
          <span class="textInfoLabel">Rodzaj sprzętu</span>
          <span class="textInfoValue">{{ product.rodzaj_sprzetu }}</span>
        </div>
        <div class="textInfoContainer" :style="{ marginTop: '23px' }">
          <span class="textInfoLabel">Rocznik</span>
          <span class="textInfoValue">{{ product.rocznik }}</span>
        </div>
      </div>
    </div>
  <div class="button">
    <b-button
        v-on:click='addToCart'
        variant="primary"
        :style="{ marginTop: '5px' }"
      >Dodaj do koszyka</b-button>
  </div>
  <div>
    <b-table hover head-variant="light"
      id="table"
      :fields="fields"
      :items="cechy"
    >
      <template #table-busy>
        <div class="text-center text-danger">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Ładowanie...</strong>
        </div>
      </template>
    </b-table>
  </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import API from '@/services/API';
import EventBus from '@/services/EventBus';
import store from '@/store';

@Component
export default class ProductDetails extends Vue {
  private product: any = null;

  private cechy: any = [];

  private fields: any = [];

  private mounted() {
    this.fields = [
      { key: 'cechaLabel', label: 'Nazwa cechy' },
      { key: 'cechaValue', label: 'Wartość' },
    ];
    this.loadProduct(this.$route.params.id);
    this.setViewTitle();
  }

  private addToCart() {
    // TODO: after create cart
  }

  private async loadProduct(id: any) {
    try {
      const data = await new API('get', `sprzet/${id}`, {}).call();
      console.log('data', data);

      this.product = data;
      this.cechy = [
        {
          cechaLabel: data.cecha_1_label,
          cechaValue: data.cecha_1_value,
        },
        {
          cechaLabel: data.cecha_2_label,
          cechaValue: data.cecha_2_value,
        },
        {
          cechaLabel: data.cecha_3_label,
          cechaValue: data.cecha_3_value,
        },
        {
          cechaLabel: data.cecha_4_label,
          cechaValue: data.cecha_4_value,
        },
      ];
    } catch (error) {
      console.error('error', error);
    }
  }

  private async setViewTitle() {
    if (store.state.auth.accountType === 'KLIENT') {
      await EventBus.$emit('layout-view', { title: 'Szczegóły sprzętu' });
    } else if (store.state.auth.accountType === 'KIEROWNIK') {
      await EventBus.$emit('layout-view', {
        title: 'Szczegóły sprzętu',
        show: false,
        text: 'Dodaj nowy sprzęt',
        onPress: () => this.$router.push({ name: 'product-add' }),
      });
    } else if (store.state.auth.accountType === 'SERWISANT') {
      await EventBus.$emit('layout-view', { title: 'Szczegóły sprzętu' });
    }
  }
}
</script>

<style lang="scss" scoped>
.view {
  padding: 46px 53px;
}

.infoSegment {
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
}

.column {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.button {
  display: flex;
  justify-content: center;
  width: 500px;
  margin: 51px 0;
}

#table {
  width: 500px;
}
</style>

<template>
  <div class="viewPadding">
    <div class="infoSegment">
      <div class='column'>
        <div class="textInfoContainer">
          <span class="textInfoLabel">Nazwa</span>
          <span class="textInfoValue">{{ product.rodzajSprzetu.nazwa }}</span>
        </div>
        <div class="textInfoContainer" :style="{ marginTop: '23px' }">
          <span class="textInfoLabel">Cena za dzień</span>
          <span class="textInfoValue">{{ product.cenaWypozyczeniaDzien + ' zł'}}</span>
        </div>
        <div v-if="accountType !== 'KLIENT'" :style="{ marginBottom: '51px' }">
          <div class="textInfoContainer" :style="{ marginTop: '23px' }">
            <span class="textInfoLabel">Wartość sprzętu</span>
            <span class="textInfoValue">{{ product.wartoscSprzetu + ' zł'}}</span>
          </div>
          <div class="textInfoContainer" :style="{ marginTop: '23px' }">
            <span class="textInfoLabel">Ilość wypożyczeń</span>
            <span class="textInfoValue">{{ '???'}}</span>
          </div>
        </div>
      </div>
      <div class='column'>
        <div class="textInfoContainer" :style="{ marginTop: '23px' }">
          <span class="textInfoLabel">Rocznik</span>
          <span class="textInfoValue">{{ product.rocznik }}</span>
        </div>
        <div v-if="accountType !== 'KLIENT'" :style="{ marginBottom: '51px' }">
          <div class="textInfoContainer" :style="{ marginTop: '23px' }">
            <span class="textInfoLabel">Id sprzętu</span>
            <span class="textInfoValue">{{ product.id }}</span>
          </div>
          <div class="textInfoContainer" :style="{ marginTop: '23px' }">
            <span class="textInfoLabel">Ilość napraw</span>
            <span class="textInfoValue">{{ '???'}}</span>
          </div>
        </div>
      </div>
      <div v-if="accountType === 'KIEROWNIK'">
        <b-button
          v-on:click='editProduct'
          variant="primary"
        >Edytuj sprzęt</b-button>
        <b-button
          v-on:click='removeProduct'
          variant="danger"
          :style="{ marginLeft: '25px' }"
        >Usuń sprzęt</b-button>
      </div>
      <div v-if="accountType === 'SERWISANT'">
        <b-button
          v-on:click='serviceProduct'
          variant="primary"
        >Serwisuj</b-button>
        <b-button
          v-on:click='blockProduct'
          variant="danger"
          :style="{ marginLeft: '25px' }"
        >Zablokuj</b-button>
      </div>
    </div>
    <div
      class="button"
      v-if="accountType === 'KLIENT'"
      :style="{ marginTop: '5px' }"
    >
      <b-button
        v-if="!isProductInCart"
        v-on:click='addToCart'
        variant="primary"
      >Dodaj do koszyka</b-button>
      <b-button
        v-else
        disabled
        variant="outline-secondary"
      >Produkt jest już w koszyku</b-button>
    </div>
    <div class="infoSegment">
      <b-table
        hover
        head-variant="light"
        id="table"
        :fields="fields"
        :items="product.getCechyArray()"
      >
        <template #table-busy>
          <div class="text-center text-danger">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Ładowanie...</strong>
          </div>
        </template>
      </b-table>
      <div class="textInfoContainer column" :style="{ marginLeft: '46px' }">
        <span class="textInfoLabel">Opis napraw</span>
        <span class="textInfoValue">{{ "opis bla bla bla bla " }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Product from '@/models/Product';
import { AccountType } from '@/models/User';
import API from '@/services/API';
import EventBus from '@/services/EventBus';
import store from '@/store';
import { CartAction } from '@/store/modules/CartModule';

@Component
export default class ProductDetails extends Vue {
  private product: Product = new Product();

  private fields: any = [];

  private accountType: AccountType | null = null;

  private isProductInCart = false;

  private mounted() {
    this.accountType = store.state.auth.accountType;
    this.fields = [
      { key: 'label', label: 'Nazwa cechy' },
      { key: 'value', label: 'Wartość' },
    ];

    store.dispatch(CartAction.IsProductInCart, this.$route.params.id).then(result => {
      this.isProductInCart = result;
    });
    this.loadProduct(this.$route.params.id);
    this.setViewTitle();
  }

  private addToCart() {
    this.$store.commit('addToCart', this.product);
    alert('Dodano produkt do koszyka');
  }

  private editProduct() {
    this.$router.push({ name: 'ProductEdit', params: { id: String(this.product.id) } });
  }

  private async removeProduct() {
    try {
      const data = await new API('delete', `sprzet/${this.product.id}`, {}).call(true);

      if (data.status === 201) {
        this.$router.back();
      } else {
        alert('Usuwanie nie powiodło się');
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  private serviceProduct() {
    this.$router.push({ name: 'ProductService', params: { id: String(this.product.id) } });
  }

  private async blockProduct() {
    try {
      const data = await new API('post', `sprzet/${this.product.id}`, {
        body: {
          rodzajSprzetu: this.product.rodzajSprzetu,
          przeznaczenie: this.product.przeznaczenie,
          cecha_1_label: this.product.cecha1Label,
          cecha_1_value: this.product.cecha1Value,
          cecha_2_label: this.product.cecha2Label,
          cecha_2_value: this.product.cecha2Value,
          cecha_3_label: this.product.cecha3Label,
          cecha_3_value: this.product.cecha3Value,
          cecha_4_label: this.product.cecha4Label,
          cecha_4_value: this.product.cecha4Value,
          cena: this.product.cenaWypozyczeniaDzien,
          rocznik: this.product.rocznik,
          wartoscSprzetu: this.product.wartoscSprzetu,
          blokada: 'Serwis',
        },
      }).call(true);

      if (data.status === 201) {
        this.loadProduct(this.$route.params.id);
      } else {
        alert('Blokowanie nie powiodło się');
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  private async loadProduct(id: any) {
    try {
      const data = await new API('get', `sprzet/${id}`, {}).call();

      this.product = new Product(data);
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
.infoSegment {
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
}

.column {
  display: flex;
  flex-direction: column;
  width: 350px;
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

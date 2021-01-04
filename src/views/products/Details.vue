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
        <div v-if="accountType !== 'KLIENT'" :style="{ marginBottom: '51px' }">
          <div class="textInfoContainer" :style="{ marginTop: '23px' }">
            <span class="textInfoLabel">Wartość sprzętu</span>
            <span class="textInfoValue">{{ product.wartosc_sprzetu + ' zł'}}</span>
          </div>
          <div class="textInfoContainer" :style="{ marginTop: '23px' }">
            <span class="textInfoLabel">Ilość wypożyczeń</span>
            <span class="textInfoValue">{{ '???'}}</span>
          </div>
        </div>
      </div>
      <div class='column'>
        <div class="textInfoContainer">
          <span class="textInfoLabel">Rodzaj sprzętu</span>
          <span class="textInfoValue">{{ product.rodzaj_sprzetu }}</span>
        </div>
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
    <div class="button" v-if="accountType === 'KLIENT'">
      <b-button
          v-on:click='addToCart'
          variant="primary"
          :style="{ marginTop: '5px' }"
        >Dodaj do koszyka</b-button>
    </div>
    <div class="infoSegment">
      <b-table
        hover
        head-variant="light"
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
      <div class="textInfoContainer column" :style="{ marginLeft: '46px' }">
        <span class="textInfoLabel">Opis napraw</span>
        <span class="textInfoValue">{{ "opis bla bla bla bla " }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { AccountType } from '@/models/User';
import API from '@/services/API';
import EventBus from '@/services/EventBus';
import store from '@/store';
import CartModule from '@/store/modules/CartModule';

@Component
export default class ProductDetails extends Vue {
  private product: any = null;

  private cechy: any = [];

  private fields: any = [];

  private accountType: AccountType | null = null;

  private mounted() {
    this.accountType = store.state.auth.accountType;
    this.fields = [
      { key: 'cechaLabel', label: 'Nazwa cechy' },
      { key: 'cechaValue', label: 'Wartość' },
    ];
    this.loadProduct(this.$route.params.id);
    this.setViewTitle();
  }

  private addToCart() {
    // TODO: after create cart
    this.$store.commit('addToCart', this.product);
    console.log(store.state.cart.currentCart);
  }

  private editProduct() {
    this.$router.push({ name: 'ProductEdit', params: { id: this.product.id } });
  }

  private async removeProduct() {
    try {
      const data = await new API('delete', `sprzet/${this.product.id}`, {}).call(true);

      if (data.status === 201) {
        this.$router.back();
      } else {
        // eslint-disable-next-line no-alert
        alert('Usuwanie nie powiodło się');
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  private serviceProduct() {
    this.$router.push({ name: 'ProductService', params: { id: this.product.id } });
  }

  private async blockProduct() {
    try {
      const data = await new API('post', `sprzet/${this.product.id}`, {
        body: {
          rodzajSprzetu: this.product.rodzaj_sprzetu,
          przeznaczenie: this.product.przeznaczenie,
          cecha_1_label: this.product.cecha_1_label,
          cecha_1_value: this.product.cecha_1_value,
          cecha_2_label: this.product.cecha_2_label,
          cecha_2_value: this.product.cecha_2_value,
          cecha_3_label: this.product.cecha_3_label,
          cecha_3_value: this.product.cecha_3_value,
          cecha_4_label: this.product.cecha_4_label,
          cecha_4_value: this.product.cecha_4_value,
          cena: this.product.cena_wypozyczenia_dzien,
          rocznik: this.product.rocznik,
          wartoscSprzetu: this.product.wartosc_sprzetu,
          blokada: 'Serwis',
        },
      }).call(true);

      if (data.status === 201) {
        this.loadProduct(this.$route.params.id);
      } else {
        // eslint-disable-next-line no-alert
        alert('Blokowanie nie powiodło się');
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  private async loadProduct(id: any) {
    try {
      const data = await new API('get', `sprzet/${id}`, {}).call();

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

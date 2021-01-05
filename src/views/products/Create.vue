<template>
  <div>
    <ProductModify
      v-model="newProduct"
      buttonLabel="Dodaj nowy sprzęt"
      :buttonOnClick="createProduct"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ProductModify from './_Modifi.vue';

import Product from '@/models/Product';
import API from '@/services/API';
import EventBus from '@/services/EventBus';

@Component({
  components: {
    ProductModify,
  },
})
export default class ProductCreate extends Vue {
  private newProduct: Product = new Product();

  private mounted() {
    this.setViewTitle();
  }

  private async createProduct() {
    try {
      const data = await new API('post', 'sprzet', {
        body: {
          rodzajSprzetu: this.newProduct.rodzajSprzetu?.nazwa,
          przeznaczenie: this.newProduct.przeznaczenie,
          cecha_1_label: this.newProduct.cecha1Label,
          cecha_1_value: this.newProduct.cecha1Value,
          cecha_2_label: this.newProduct.cecha2Label,
          cecha_2_value: this.newProduct.cecha2Value,
          cecha_3_label: this.newProduct.cecha3Label,
          cecha_3_value: this.newProduct.cecha3Value,
          cecha_4_label: this.newProduct.cecha4Label,
          cecha_4_value: this.newProduct.cecha4Value,
          cena: this.newProduct.cenaWypozyczeniaDzien,
          rocznik: this.newProduct.rocznik,
          wartoscSprzetu: this.newProduct.wartoscSprzetu,
        },
      }).call(true);

      if (data.status === 400) {
        alert('Wprowadzono błędne dane');
      } else if (data.status === 201) {
        this.$router.back();
        alert('Stworzono sprzęt');
      } else {
        alert('Nieznany błąd');
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  private async setViewTitle() {
    await EventBus.$emit('layout-view', { title: 'Keator sprzetu' });
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

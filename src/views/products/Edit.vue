<template>
  <div>
    <ProductModify
      v-model="product"
      buttonLabel="Zapisz zmiany"
      :buttonOnClick="updateProduct"/>
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
export default class ProductEdit extends Vue {
  private product: Product = new Product();

  private mounted() {
    this.loadProduct(this.$route.params.id);
    this.setViewTitle();
  }

  private async loadProduct(id: any) {
    try {
      const data = await new API('get', `sprzet/${id}`, {}).call();

      this.product = new Product(data);
    } catch (error) {
      console.error('error', error);
    }
  }

  private async updateProduct() {
    try {
      const data = await new API('post', `sprzet/${this.product.id}`, {
        body: {
          rodzajSprzetu: this.product.rodzajSprzetu?.nazwa,
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
          blokada: this.product.blokada,
        },
      }).call(true);

      if (data.status === 400) {
        alert('Wystąpił błąd, sprawdz wprowadzone dane');
      } else if (data.status === 201) {
        this.$router.back();
        alert('Zaktualizowano sprzęt');
      } else {
        alert('Nieznany błąd');
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  private async setViewTitle() {
    await EventBus.$emit('layout-view', { title: 'Edycja sprzetu' });
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

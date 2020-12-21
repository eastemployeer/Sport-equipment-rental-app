<template>
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

        <template #cell(id)>
         <!-- router -->
            <b-icon-trash  variant="danger" scale="1.5"/>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

import EventBus from '@/services/EventBus';

@Component
export default class MyCart extends Vue {
   private parentHeight = 0;

  private currentPage = 1;

  private totalRows = 0;

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

  private loadProducts() {
    this.products = [{
      rodzaj_sprzetu: 'buty narciarskie',
      cena_wypozyczenia_dzien: '100',
      cecha_1_label: 'rozmiar',
      cecha_1_value: 'S',
      cecha_2_label: 'marka',
      cecha_2_value: 'salomon',
      cecha_3_label: 'kolor',
      cecha_3_value: 'czerwony',
      cecha_4_label: 'poziom zaawansowania',
      cecha_4_value: 'ekspert',
      id: 22,
    },
    ];
  }

  private async setViewTitle() {
    await EventBus.$emit('layout-view-title', 'Twój koszyk');
  }
}
</script>

<style scoped lang="scss">
.buttons {
  display: flex;
  flex-direction: row;
  height: 38px;
}
</style>

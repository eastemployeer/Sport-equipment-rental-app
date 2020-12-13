<template>
  <div class="view list" ref="table">
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
          <router-link :to="{ name: 'product-details', params: { id: data.value.id } }">
            <b-icon-arrow-right scale="1.5"/>
          </router-link>
        </template>
      </b-table>
      <div class="buttons">
        <b-dropdown id="dropdown-1" :text="'Sezon ' + sezon">
          <b-dropdown-item v-on:click="sezon = 'zimowy'">Sezon ziomowy</b-dropdown-item>
          <b-dropdown-item v-on:click="sezon = 'letni'">Sezon letni</b-dropdown-item>
        </b-dropdown>
        <div :style="{ flex: 1 }">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="30"
            align="center"
            last-number
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import API from '@/services/API';

@Component
export default class ProductList extends Vue {
  private parentHeight = 0;

  private currentPage = 2;

  private totalRows = 0;

  private sezon = 'zimowy';

  private isLoading = true;

  private products: any[] = [];

  private fields: any[] = [];

  @Watch('currentPage')
  public onCurrentPageChange() {
    this.loadProducts();
  }

  @Watch('sezon')
  public onSezonChange() {
    this.loadProducts();
  }

  private mounted() {
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

  private async loadProducts() {
    try {
      const data = await new API('get', 'sprzet', {
        query: {
          limit: 30,
          offset: (this.currentPage - 1) * 30,
          sezon: this.sezon,
        },
      }).call();

      this.products = data.rows;
      this.totalRows = data.totalRows;
      this.isLoading = false;
    } catch (error) {
      console.error('error', error);
    }
  }
}
</script>

<style lang="scss">
.buttons {
  display: flex;
  flex-direction: row;
  height: 38px;
}
</style>

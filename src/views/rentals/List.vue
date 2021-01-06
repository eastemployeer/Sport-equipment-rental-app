<template>
  <div class="view list text-center" ref="table">
    <div class="list-table">
      <b-table sticky-header hover head-variant="light"
        :style="{ maxHeight: parentHeight - 16 - 38 + 'px' }"
        :fields="fields"
        :items="servalRentals"
        :busy="isLoading"
      >
        <template #table-busy>
          <div class="text-center text-danger">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Ładowanie...</strong>
          </div>
        </template>

        <template #cell(poczatek)="data">
          <div class="text-center">
            {{ new Date(data.value).toLocaleDateString('pl', { year: 'numeric', month: 'long', day: 'numeric' }) }}
          </div>
        </template>
        <template #cell(koniec)="data">
          <div class="text-center">
            {{ new Date(data.value).toLocaleDateString('pl', { year: 'numeric', month: 'long', day: 'numeric' }) }}
          </div>
        </template>

        <template #cell(koszt)="data">
          <div class="text-center">
            {{ data.value + " zł" }}
          </div>
        </template>

        <template #cell(id)="data">
          <router-link :to="{ name: 'RentalsDetails', params: { id: data.item.id } }">
            <b-icon-arrow-right scale="1.5"/>
          </router-link>
        </template>
      </b-table>
      <div class="buttons">
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

import Rentals from '@/models/Rentals';
import API from '@/services/API';
import EventBus from '@/services/EventBus';
import store from '@/store';

@Component
export default class ProductList extends Vue {
  private parentHeight = 0;

  private currentPage = 1;

  private totalRows = 0;

  private isLoading = true;

  private servalRentals: Rentals[] = [];

  private fields: any[] = [];

  @Watch('currentPage')
  public onCurrentPageChange() {
    this.loadRentals();
  }

  private mounted() {
    this.setViewTitle();

    this.parentHeight = (this.$refs.table as any).offsetHeight;
    this.fields = [
      { key: 'poczatek', label: 'Data wypożyczenia' },
      { key: 'koniec', label: 'Data oddania' },
      { key: 'koszt', label: 'Cena' },
      { key: 'status', label: 'Status' },
      { key: 'id', label: '' },
    ];
    this.loadRentals();
  }

  private async setViewTitle() {
    if (store.state.auth.accountType === 'KLIENT') {
      await EventBus.$emit('layout-view', { title: 'Lista Twoich wypożyczeń' });
    } else {
      await EventBus.$emit('layout-view', { title: 'Lista wypożyczeń' });
    }
  }

  private async loadRentals() {
    if (store.state.auth.accountType === 'KLIENT') {
      try {
        const data = await new API('get', `wypozyczenie/klient/${store.state.auth.currentUser.id}`, {
          query: {
            limit: 30,
            offset: (this.currentPage - 1) * 30,
          },
        }).call();

        this.servalRentals = data.rows.map(row => new Rentals(row));
        this.totalRows = data.totalRows;
        this.isLoading = false;
      } catch (error) {
        console.error('error', error);
      }
    } else {
      try {
        const data = await new API('get', 'wypozyczenie', {
          query: {
            limit: 30,
            offset: (this.currentPage - 1) * 30,
          },
        }).call();

        this.servalRentals = data.rows;
        this.totalRows = data.totalRows;
        this.isLoading = false;
      } catch (error) {
        console.error('error', error);
      }
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

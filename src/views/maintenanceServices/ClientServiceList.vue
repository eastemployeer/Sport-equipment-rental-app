<template>
<div
  v-bind:class="{
    container: $store.state.auth.accountType === 'KLIENT',
    view: $store.state.auth.accountType !== 'KLIENT',
  }"
  ref="table"
>
  <div class="list text-center">
      <div class="list-table">
        <b-table sticky-header hover head-variant="light"
          :style="{ maxHeight: $store.state.auth.accountType === 'KLIENT' ? undefined : parentHeight - 80 + 'px' }"
          :fields="fields"
          :items="services"
          :busy="isLoading"
        >
          <template #table-busy>
            <div class="text-center text-danger">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Ładowanie...</strong>
            </div>
          </template>

          <template #cell(cena)="data">
            <div class="text-center">
              {{data.value + " zł"}}
            </div>
          </template>
          <template #cell(data_wykonania)="data">
            <div class="text-center">
              {{ new Date(data.value).toLocaleDateString('pl', { year: 'numeric', month: 'long', day: 'numeric' }) }}
            </div>
          </template>

          <template #cell(id)="data">
            <router-link :to="{ name: 'ClientServiceListDetails', params: { id: data.item.id } }">
              <b-icon-arrow-right scale="1.5"/>
            </router-link>
          </template>
        </b-table>
        <div class="buttons">
          <div v-if="isServicemanLogged" class="btnStyle">
            <button type="button" :style="{ marginLeft: '207px' }" class="btn btn-primary" v-on:click="addNewService">Dodaj nowy serwis</button>
          </div>
          <div :style="{ flex: 1 }">
            <b-pagination
              v-model="currentPage"
              :style="{marginLeft: '-320px'}"
              :total-rows="totalRows"
              :per-page="30"
              align="center"
              last-number
            />
          </div>
        </div>
      </div>
  </div>
</div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import API from '@/services/API';
import EventBus from '@/services/EventBus';

@Component
export default class ClientServiceList extends Vue {
  private isServicemanLogged = 0;

  private currentPage = 1;

  private totalRows = 0;

  private isLoading = true;

  private services: any[] = [];

  private fields: any[] = [];

  @Watch('currentPage')
  public onCurrentPageChange() {
    this.loadMyServices();
  }

  private mounted() {
    this.checkLoggedAccount();
    this.parentHeight = (this.$refs.table as any).offsetHeight;
    this.setViewTitle();
    this.fields = [
      { key: 'nazwa', label: 'Nazwa usługi' },
      { key: 'cena', label: 'Cena' },
      { key: 'data_wykonania', label: 'Data zakończenia serwisu' },
      { key: 'status', label: 'Status' },
      { key: 'id', label: '' },
    ];
    this.loadMyServices();
  }

  private addNewService() {
    this.$router.push({ name: 'ClientServiceCreate' });
  }

  private checkLoggedAccount() {
    if (this.$store.state.auth.accountType === 'SERWISANT') {
      this.isServicemanLogged = 1;
    } else { this.isServicemanLogged = 0; }
  }

  private async setViewTitle() {
    if (this.isServicemanLogged) { await EventBus.$emit('layout-view', { title: 'Lista serwisów zleconych przez klientów' }); } else {
      await EventBus.$emit('layout-view', { title: 'Lista moich zleconych serwisów' });
    }
  }

  private async loadMyServices() {
    if (!this.isServicemanLogged) {
      try {
        const data = await new API('get', `wykonanaUslugaSerwisowa/klient/${this.$store.state.auth.currentUser.id}`, {
          query: {
            limit: 30,
            offset: (this.currentPage - 1) * 30,
          },
        }).call();

        this.services = data.rows;
        this.totalRows = data.totalRows;
        this.isLoading = false;
      } catch (error) {
        console.error('error', error);
      }
    } else {
      try {
        const data = await new API('get', 'wykonanaUslugaSerwisowa', {
          query: {
            limit: 30,
            offset: (this.currentPage - 1) * 30,
          },
        }).call();

        this.services = data.rows;
        this.totalRows = data.totalRows;
        this.isLoading = false;
      } catch (error) {
        console.error('error', error);
      }
    }
  }
}

</script>
<style lang="scss" scoped>
.btnStyle {
font-size: 16px;
line-height: 24px;
}
</style>

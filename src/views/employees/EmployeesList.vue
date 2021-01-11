<template>
<div class="container">
  <div class="view list text-center" ref="table">
      <div class="list-table">
        <b-table sticky-header hover head-variant="light"
          :style="{ maxHeight: '500px' }"
          :fields="fields"
          :items="employees"
          :busy="isLoading"
        >
          <template #table-busy>
            <div class="text-center text-danger">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Ładowanie...</strong>
            </div>
          </template>

          <template #cell(typ_konta)="data">
            <div class="text-center">
              {{nameOfPosition(data.value)}}
            </div>
          </template>
          <template #cell(blokada)="data">
            <div v-if="data.value === 0" class="text-center">
              Nie
            </div>
            <div v-else class="text-center">
              Tak
            </div>
          </template>

          <template #cell(id)="data">
            <router-link :to="{ name: 'EditEmployee', params: { id: data.item.id } }">
              <b-icon-pencil scale="1.5"/>
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
  <div class="btnStyle">
    <button type="button" style="margin-top: 20px;" class="btn btn-primary" v-on:click="addNewEmployee">Dodaj nowego pracownika</button>
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

  private employees: any[] = [];

  private fields: any[] = [];

  @Watch('currentPage')
  public onCurrentPageChange() {
    this.loadEmployees();
  }

  private nameOfPosition(data: any) {
    const resultString = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
    return resultString;
  }

  private mounted() {
    this.setViewTitle();
    this.fields = [
      { key: 'imie', label: 'Imię' },
      { key: 'nazwisko', label: 'Nazwisko' },
      { key: 'typ_konta', label: 'Stanowisko' },
      { key: 'blokada', label: 'Blokada konta' },
      { key: 'id', label: '' },
    ];
    this.loadEmployees();
  }

  private addNewEmployee() {
    this.$router.push({ name: 'CreateEmployee' });
  }

  private async setViewTitle() {
    await EventBus.$emit('layout-view', { title: 'Lista pracowników' });
  }

  private async loadEmployees() {
    try {
      const data = await new API('get', 'pracownik', {
        query: {
          limit: 20,
          offset: (this.currentPage - 1) * 20,
        },
      }).call();

      this.employees = data.rows;
      this.totalRows = data.totalRows;
      this.isLoading = false;
    } catch (error) {
      console.error('error', error);
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

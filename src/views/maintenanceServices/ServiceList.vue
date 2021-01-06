<template>
<div class="container">
    <div class="view list text-center"  ref="table">
      <div class="list-table">
        <b-table sticky-header hover head-variant="light"
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

          <template #cell(szacowany_czas_wykonania)="data">
            <div class="text-center">
              {{ data.item.szacowany_czas_wykonania + " dni"}}
            </div>
          </template>

          <template #cell(cena)="data">
            {{ data.item.cena + " zł" }}
          </template>
          <template v-if="isManagerLogged" #cell(id)="data">
            <b-icon-trash v-on:click="deleteItem(data.item.id)" variant="danger" style="margin-right: 40px; cursor: pointer;" scale="1.5"/>
            <router-link :to="{ name: 'EditService', params: { id: data.item.id } }">
              <b-icon-pencil scale="1.5"/>
            </router-link>
          </template>
          <template v-else #cell(id)>
          </template>
        </b-table>
      </div>
    </div>
  <div v-if="!isManagerLogged" class="box">
    <strong class="textH">Serwis</strong>
      <p class="text">
        Usługi realizujemy na miejscu.
        Proszę przyjść ze swoim sprzętem do serwisowni wypożyczalni w godzinach pracy.
        Przyjmiemy go od razu
      </p>
  </div>
  <div v-else class="col-md-6" style="margin-top: 30px;">
    <button type="button" class="btn btn-lg btn-primary" v-on:click="addNewService">Dodaj nową usługę serwisową</button>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import API from '@/services/API';
import EventBus from '@/services/EventBus';

@Component
export default class ProductList extends Vue {
  private currentPage = 1;

  private isManagerLogged = 0;

  private isLoading = true;

  private products: any[] = [];

  private fields: any[] = [];

  private mounted() {
    this.setViewTitle();

    this.fields = [
      { key: 'nazwa', label: 'Nazwa usługi' },
      { key: 'szacowany_czas_wykonania', label: 'Przybliżony czas wykonania usługi' },
      { key: 'cena', label: 'Cena' },
      { key: 'id', label: '' },
    ];
    this.loadProducts();
    this.checkLoggedAccount();
  }

  private async addNewService() {
    this.$router.push({ name: 'CreateService' });
  }

  private async deleteItem(productId: any) {
    // TODO
    try {
      const data = await new API('delete', `uslugaSerwisowa/${productId}`, {}).call();
      this.loadProducts();
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('Podany użytkownik już istnieje');
      console.error('error', error);
    }
  }

  private checkLoggedAccount() {
    if (this.$store.state.auth.accountType === 'KIEROWNIK') {
      this.isManagerLogged = 1;
    } else { this.isManagerLogged = 0; }
  }

  private async setViewTitle() {
    await EventBus.$emit('layout-view', { title: 'Lista usług serwisowych' });
  }

  private async loadProducts() {
    try {
      const data = await new API('get', 'uslugaSerwisowa', {
        query: {
          limit: 20,
          offset: 0,
        },
      }).call();

      this.products = data;
      this.isLoading = false;
    } catch (error) {
      console.error('error', error);
    }
  }
}
</script>

<style lang="scss">
.smallContainer {
  min-height: 300px;
}
.container {
  display: flex;
  flex-direction: column;
  max-height: 70%;
}
.box {
box-sizing: border-box;
display: flex;
flex-direction: column;
align-items: flex-start;
width: 378px;
height: 126px;
padding: 16px;
margin-top: 60px;
margin-left: auto;

/* Daybreak Blue / blue-1 */
background: #E6F7FF;

/* Daybreak Blue / blue-3 */
border: 1px solid #91D5FF;
border-radius: 4px;
}
.textH {
font-size: 16px;
line-height: 24px;
}
.text {
font-size: 14px;
font-style: normal;
font-weight: normal;
line-height: 22px;
color: #595959;
}
.buttons {
  display: flex;
  flex-direction: row;
  height: 38px;
}
</style>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div class="textInfoLabel">Nazwa serwisu</div>
        <div class="textInfoValue">{{service.nazwa}}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="textInfoLabel">Cena serwisu</div>
        <div class="textInfoValue">{{service.cena}}</div>
      </div>
      <div class="col-md-6">
        <div class="textInfoLabel">Przewidywana data realizacji</div>
        <div class="textInfoValue">{{ new Date(service.data_wykonania).toLocaleDateString('pl', { year: 'numeric', month: 'long', day: 'numeric' }) }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="textInfoLabel">Nazwa sprzętu (model)</div>
        <div class="textInfoValue">{{service.nazwa_sprzetu}}</div>
      </div>
      <div class="col-md-6">
        <div class="textInfoLabel">Status</div>
        <div class="textInfoValue">{{service.status}}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="textInfoLabel">Opis naprawy</div>
        <div class="textInfoValue">[Do naprawy] - {{service.nazwa}}</div>
        <div v-if="service.status === 'Zakończony'" class="textInfoValue">[Po naprawie] - wszystko zostało zrealizowane</div>
      </div>
    </div>
    <div>
      <button type="button" class="btn btn-lg btn-primary" v-if="isServicemanLogged === 1 && service.status !== 'Zakończony'" v-on:click="finishService">Zakończ serwis</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import API from '@/services/API';
import EventBus from '@/services/EventBus';

@Component
export default class ClientServiceListDetails extends Vue {
  private service : any = {};

  private isLoading = true;

  private isServicemanLogged = 0;

  private async setTitleAndLoadService() {
    // getService
    try {
      const data = await new API('get', `wykonanaUslugaSerwisowa/${this.$route.params.id}`, {}).call();
      this.service = data;
      this.isLoading = false;
    } catch (error) {
      console.error('error', error);
    }
    // setViewTitle
    if (this.isServicemanLogged) { await EventBus.$emit('layout-view', { title: `Szczegóły serwisu sprzętu klienta: ${this.service.nazwa}` }); } else {
      await EventBus.$emit('layout-view', { title: `Szczegóły mojego serwisu sprzętu: ${this.service.nazwa}` });
    }
  }

  private checkLoggedAccount() {
    if (this.$store.state.auth.accountType === 'SERWISANT') {
      this.isServicemanLogged = 1;
    } else { this.isServicemanLogged = 0; }
  }

  private finishService() {

  }

  private mounted() {
    this.checkLoggedAccount();
    this.setTitleAndLoadService();
  }
}
</script>

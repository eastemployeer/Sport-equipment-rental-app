<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <label for="serviceName">Nazwa serwisu</label>
        <select name="serviceName" v-model="newService" class="custom-select">
          <option v-for="service in services" v-bind:key="service.nazwa" v-bind:value="service">
            {{service.nazwa}}
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 form-group">
        <div class="textInfoLabel" style="margin-top: 10px;">Cena serwisu</div>
        <div v-if="newService.cena" class="textInfoValue">{{newService.cena}} zł</div>
        <div v-else class="textInfoValue">0 zł</div>
      </div>
      <div class="col-md-6 form-group">
        <div class="textInfoLabel" style="margin-top: 10px;">Przewidywana data zakończenia</div>
        <div class="textInfoValue">{{new Date(newServiceDate).toLocaleDateString('pl', { year: 'numeric', month: 'long', day: 'numeric' }) }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 form-group">
        <label for="email" class="textLabel">Email klienta</label>
        <input v-model.trim="clientEmail" name="email" type="text" class="form-control" placeholder="Email"/>
      </div>
      <div class="col-md-6 form-group">
        <label for="device" class="textLabel">Nazwa sprzętu (model)</label>
        <input v-model.trim="clientDevice" name="device" type="text" class="form-control" placeholder="Nazwa sprzętu"/>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 form-group">
        <label for="serviceDescription" class="textLabel">Opis naprawy</label>
        <input v-model="clientServiceDescription" ref="detailInput" v-on:mouseup.left="checkCursorPosition($event)" v-on:keydown.delete="checkCursorPosition($event)" name="serviceDescription" type="text" class="form-control"/>
      </div>
    </div>
    <div class="btnStyle">
      <button type="button" class="btn btn-primary" v-on:click="addNewService">Dodaj nowy serwis</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import API from '@/services/API';
import EventBus from '@/services/EventBus';

@Component
export default class ClientServiceCreate extends Vue {
  private codeInput : any = {};

  private clientEmail = '';

  private clientDevice = '';

  private newService : any = {};

  private services : any[] = [];

  private clientServiceDescription = '[Do naprawy] - ';

  private async setViewTitle() {
    await EventBus.$emit('layout-view', { title: 'Kreator nowego serwisu sprzętu klienta' });
  }

  private get newServiceDate() {
    const expectedEndDate = new Date();
    expectedEndDate.setDate(expectedEndDate.getDate() + this.newService.szacowany_czas_wykonania || expectedEndDate.getDate());
    return expectedEndDate;
  }

  private mounted() {
    this.setViewTitle();
    this.loadProducts();
  }

  private dateToYYYYMMDD(d: Date) {
    return d && new Date(d.getTime() - (d.getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0];
  }

  private async addNewService() {
    if (this.newService.nazwa !== null && this.clientEmail !== '' && this.clientDevice !== '') {
      try {
        const data = await new API('post', 'wykonanaUslugaSerwisowa', {
          body: {
            email: this.clientEmail,
            uslugaSerwisowaId: this.newService.id,
            nazwaSprzetu: this.clientDevice,
            opis: this.clientServiceDescription,
            dataWykonania: this.dateToYYYYMMDD(this.newServiceDate),
          },
        }).call(true);

        if (data.status === 400) {
          alert('Wystąpił błąd, sprawdz wprowadzone dane');
        } else if (data.status === 201) {
          this.$router.back();
          alert('Utworzono nowy serwis sprzętu klienta');
        } else {
          alert('Nieznany błąd');
        }
      } catch (error) {
        console.error('error', error);
      }
    }
  }

  private async loadProducts() {
    try {
      const data = await new API('get', 'uslugaSerwisowa', {
        query: {
          limit: 20,
          offset: 0,
        },
      }).call();

      this.services = data;
    } catch (error) {
      console.error('error', error);
    }
  }

  private checkCursorPosition(event : any) {
    this.codeInput = this.$refs.detailInput;
    const position = this.codeInput.selectionStart;
    if (position < 16) {
      event.preventDefault();
      this.codeInput.selectionStart = event.currentTarget.value.length;
    }
  }
}
</script>
<style lang="scss" scoped>
.btnStyle {
  margin-top: 20px;
}
.row {
  margin-top: 15px;
}
</style>

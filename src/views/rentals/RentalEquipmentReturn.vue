<template>
  <div class="viewPadding">
    <b-table
      sticky-header
      hover
      head-variant="light"
      id="table"
      :fields="fields"
      :items="rentals.sprzety"
      :key="rentals.id"
      :busy="isLoading"
    >
      <template #table-busy>
        <div class="text-center text-danger">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Ładowanie...</strong>
        </div>
      </template>

      <template #cell(kara)="data">
        <Input
          v-model="rentals.sprzety[data.index].kara"
          placeholder="0"
          inputType="number"
          @input="(newData) => onPenaltyInput(data.index, newData.target.value)"
          :max="11"
        />
      </template>

      <template #cell(opisKary)="data">
        <Input
          v-model="data.item.opisKary"
          placeholder="Opis"
          @input="(newData) => onDescInput(data.index, newData.target.value)"
          :max="500"
        />
      </template>

      <template #cell(id)="data">
        <router-link :to="{ name: 'ProductDetails', params: { id: data.item.id } }">
          <b-icon-arrow-right scale="1.5"/>
        </router-link>
      </template>
    </b-table>
    <div class="row" :style="{ marginLeft: '15px' }">
      <div class="column">
        <div class="form-group">
          <div class="textInfoLabel">Suma wypożyczenia</div>
          <div class="textInfoValue">{{rentals.priceForDay}} zł dziennie</div>
        </div>
        <div class="form-group">
          <div class="textInfoLabel">Data odebrania sprzętu</div>
          <div class="textInfoValue">{{rentals.formatedPoczatek }}</div>
        </div>
        <div class="form-group">
          <div class="textInfoLabel">Koszt całej rezerwacji bez kaucji i kar</div>
          <div class="textInfoValue">{{rentals.totalPrice}} zł</div>
        </div>
      </div>
      <div class="column">
        <div class="form-group">
          <div class="textInfoLabel">Kaucja</div>
          <div class="textInfoValue">{{rentals.naliczonaKaucja}} zł</div>
        </div>
        <div class="form-group">
          <div class="textInfoLabel">Data oddania sprzętu</div>
          <div class="textInfoValue">{{rentals.formatedKoniec}}</div>
        </div>
        <div class="form-group">
          <div class="textInfoLabel">Status</div>
          <div class="textInfoValue">{{rentals.status}}</div>
        </div>
      </div>
      <div class="column">
        <div class="form-group">
          <div class="textInfoLabel">Klient</div>
          <div class="textInfoValue">{{ rentals.imie + ' ' + rentals.nazwisko }}</div>
        </div>
        <div class="form-group">
          <div class="textInfoLabel">Naliczona kara</div>
          <div class="textInfoValue">{{rentals.calculateFinancialPenalty()}} zł</div>
        </div>
        <div class="form-group">
          <div class="textInfoLabel">Opis do kary</div>
          <div class="textInfoValue" v-html="rentals.getFormatedPenaltyDescription()" :style="{whiteSpace: 'pre-line'}"></div>
        </div>
      </div>
      <div class="column">
        <b-alert show variant="primary">
          <h4 class="alert-heading">Nakładanie kar</h4>
          <p style="font-size: 14px;">Jeśli nie nałożono kary na dany produkt zostaw pole wartości kary i jej opisu puste</p>
        </b-alert>
      </div>
    </div>
    <b-button
      v-on:click='updateRentals'
      variant="primary"
      :style="{ marginTop: '5px', marginLeft: '15px' }"
    >Pobrano opłaty i zwrócono sprzęt</b-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Rentals from '@/models/Rentals';
import { User } from '@/models/User';
import API from '@/services/API';
import EventBus from '@/services/EventBus';

@Component
export default class RentalEquipmentReturn extends Vue {
  private rentals: Rentals = new Rentals();

  private fields: any = [];

  private descriptionPenalty = '';

  private calculatedPenalty = 0;

  private isLoading = true;

  private currentUser: User | null = null;

  private mounted() {
    this.currentUser = this.$store.state.auth.currentUser;
    this.fields = [
      { key: 'rodzajSprzetu.nazwa', label: 'Nazwa sprzetu' },
      { key: 'kara', label: 'Kara' },
      { key: 'opisKary', label: 'Opis uszkodzenia' },
      { key: 'id', label: '' },
    ];

    this.setViewTitle();
    this.loadRentals(this.$route.params.id);
  }

  private onPenaltyInput(index: number, data: any) {
    this.rentals.sprzety[index].kara = data;
  }

  private onDescInput(index: number, data: any) {
    this.rentals.sprzety[index].opisKary = data;
  }

  private async loadRentals(id: any) {
    try {
      this.isLoading = true;
      const data = await new API('get', `wypozyczenie/${id}`, {}).call();

      this.rentals = new Rentals(data);
      this.isLoading = false;
    } catch (error) {
      console.error('error', error);
      this.isLoading = false;
    }
  }

  private async setViewTitle() {
    await EventBus.$emit('layout-view', { title: 'Szczegóły wypożyczenia - proces zwracania sprzętu' });
  }

  private async updateRentals() {
    const data = await new API('post', `wypozyczenie/${this.rentals.id}`, {
      body: {
        status: 'Zakończony',
        sprzety: this.rentals.sprzety,
      },
    }).call(true);

    if (data.status === 201) {
      this.$router.back();
      alert('Zaktualizowano wypożyczenie');
    } else {
      alert('Nieznany błąd');
    }
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
</style>

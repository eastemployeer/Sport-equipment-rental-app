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

      <template #cell(cenaWypozyczeniaDzien)="data">
        <div class="text-center">
          {{ data.value + " zł" }}
        </div>
      </template>

      <template #cell(cecha_1)="data">
        {{ data.item.cecha1Label ? data.item.cecha1Label + ": " + data.item.cecha1Value : "" }}
      </template>
      <template #cell(cecha_2)="data">
        {{ data.item.cecha2Label ? data.item.cecha2Label + ": " + data.item.cecha2Value : "" }}
      </template>
      <template #cell(cecha_3)="data">
        {{ data.item.cecha3Label ? data.item.cecha3Label + ": " + data.item.cecha3Value : "" }}
      </template>
      <template #cell(cecha_4)="data">
        {{ data.item.cecha4Label ? data.item.cecha4Label + ": " + data.item.cecha4Value : "" }}
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
          <div class="textInfoLabel">Koszt całej rezerwacji bez kaucji</div>
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
          <div class="textInfoLabel">Naliczona kara</div>
          <div class="textInfoValue">{{rentals.calculateFinancialPenalty()}} zł</div>
        </div>
        <div class="form-group">
          <div class="textInfoLabel">Opis do kary</div>
          <div class="textInfoValue" v-html="rentals.getFormatedPenaltyDescription()" :style="{whiteSpace: 'pre-line'}"></div>
        </div>
      </div>
      <div class="column" v-if="accountType !== 'KLIENT'">
        <div class="form-group">
          <div class="textInfoLabel">Klient</div>
          <div class="textInfoValue">{{ currentUser.imie + ' ' + currentUser.nazwisko }}</div>
        </div>
      </div>
    </div>
    <b-button
      v-if="showButton && accountType === 'PRACOWNIK'"
      v-on:click='onButtonClick'
      variant="primary"
      :style="{ marginTop: '5px', marginLeft: '15px' }"
    >{{getButtonText()}}</b-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Rentals from '@/models/Rentals';
import { AccountType, User } from '@/models/User';
import API from '@/services/API';
import EventBus from '@/services/EventBus';
import store from '@/store';

@Component
export default class RentalsDetails extends Vue {
  private rentals: Rentals = new Rentals();

  private fields: any = [];

  private isLoading = true;

  private showButton = true;

  private accountType: AccountType | null = null;

  private currentUser: User | null = null;

  private mounted() {
    this.accountType = store.state.auth.accountType;
    this.currentUser = store.state.auth.currentUser;
    this.fields = [
      { key: 'rodzajSprzetu.nazwa', label: 'Nazwa sprzetu' },
      { key: 'cenaWypozyczeniaDzien', label: 'Cena za dzień' },
      { key: 'cecha_1', label: 'Cecha' },
      { key: 'cecha_2', label: 'Cecha' },
      { key: 'cecha_3', label: 'Cecha' },
      { key: 'cecha_4', label: 'Cecha' },
      { key: 'id', label: '' },
    ];

    this.setViewTitle();
    this.loadRentals(this.$route.params.id);
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
    await EventBus.$emit('layout-view', { title: 'Szczegóły wypożyczenia' });
  }

  private getButtonText() {
    if (this.rentals.status === 'Rezerwacja (nowa)') return 'Sprzęt został odłożony';
    if (this.rentals.status === 'Rezerwacja') return 'Pobrano opłate i wydano sprzęt';
    if (this.rentals.status === 'W trakcie wypożyczenia') return 'Zwrot sprzętu';
    if (this.rentals.status === 'Zakończony') this.showButton = false;

    return '';
  }

  private onButtonClick() {
    if (this.rentals.status === 'Rezerwacja (nowa)') this.changeStatus('Rezerwacja');
    else if (this.rentals.status === 'Rezerwacja') this.changeStatus('W trakcie wypożyczenia');
    else if (this.rentals.status === 'W trakcie wypożyczenia') this.openEquipmentReturn();
  }

  private async changeStatus(newStatus: string) {
    const data = await new API('post', `wypozyczenie/${this.rentals.id}`, {
      body: {
        status: newStatus,
        sprzety: this.rentals.sprzety,
      },
    }).call(true);

    if (data.status === 201) {
      this.loadRentals(this.$route.params.id);
      alert('Zaktualizowano status');
    } else {
      alert('Nieznany błąd');
    }
  }

  private openEquipmentReturn() {
    this.$router.push({ name: 'RentalEquipmentReturn', params: { id: String(this.rentals.id) } });
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
}
</style>

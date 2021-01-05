<template>
  <div class="viewPadding">
    <div class="dataContainer">
      <div class='column'>
        <b-dropdown
          id="dropdown-1"
          :text="value.rodzajSprzetu ? value.rodzajSprzetu.nazwa : 'Rodzaj sprzętu'"
          variant="outline-dark"
          :key="String(rodzaje.length)"
          class="m-md-2"
        >
          <b-dropdown-item
            v-for="item in rodzaje"
            :key="item"
            v-on:click="() => selectRodzaj(item)"
          >
            <span>{{ item.rodzajSezonu + " / " + item.nazwa }}</span>
          </b-dropdown-item>
        </b-dropdown>
        <Input
          v-model="value.przeznaczenie"
          class="input"
          label="Przeznaczenie"
          placeholder="szkoleniowy"
          :max="50"
        />
        <Input
          v-model="value.cenaWypozyczeniaDzien"
          class="input"
          label="Cena za dzień"
          inputType="number"
          placeholder="45"
          :max="11"
        />
      </div>
      <div class='column'>
        <Input
          v-model="value.rocznik"
          class="input"
          label="Rocznik"
          placeholder="1998"
          :max="4"
        />
        <Input
          v-model="value.wartoscSprzetu"
          class="input"
          label="Wartość sprzętu"
          inputType="number"
          placeholder="1400"
          :max="11"
        />
      </div>
      <div class="column button">
        <b-button
          v-on:click='buttonOnClick'
          variant="primary"
        >{{ buttonLabel }}</b-button>
      </div>
    </div>
    <div class="cechaContainer">
      <div class='row'>
        <Input
          v-model="value.cecha1Label"
          class="inputCecha"
          label="Nazwa cechy 1"
          placeholder="kolor"
          :max="50"
        />
        <Input
          v-model="value.cecha1Value"
          class="inputCecha"
          label="Wartość cechy 1"
          placeholder="czarny"
          :max="50"
        />
      </div>
      <div class='row'>
        <Input
          v-model="value.cecha2Label"
          class="inputCecha"
          label="Nazwa cechy 2"
          placeholder="kolor"
          :max="50"
        />
        <Input
          v-model="value.cecha2Value"
          class="inputCecha"
          label="Wartość cechy 2"
          placeholder="czarny"
          :max="50"
        />
      </div>
      <div class='row'>
        <Input
          v-model="value.cecha3Label"
          class="inputCecha"
          label="Nazwa cechy 3"
          placeholder="kolor"
          :max="50"
        />
        <Input
          v-model="value.cecha3Value"
          class="inputCecha"
          label="Wartość cechy 3"
          placeholder="czarny"
          :max="50"
        />
      </div>
      <div class='row'>
        <Input
          v-model="value.cecha4Label"
          class="inputCecha"
          label="Nazwa cechy 4"
          placeholder="kolor"
          :max="50"
        />
        <Input
          v-model="value.cecha4Value"
          class="inputCecha"
          label="Wartość cechy 4"
          placeholder="czarny"
          :max="50"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Input from '@/components/Input.vue';

import Product, { IRodzaj } from '@/models/Product';
import API from '@/services/API';

@Component({
  components: {
    Input,
  },
})
export default class ProductModify extends Vue {
  @Prop() value!: Product;

  @Prop() buttonLabel!: string;

  @Prop() buttonOnClick!: () => void;

  private rodzaje: IRodzaj[] = [];

  mounted() {
    this.loadRodzajSprzetu();
  }

  private selectRodzaj(rodzaj: IRodzaj) {
    this.value.rodzajSprzetu = rodzaj;
  }

  private async loadRodzajSprzetu() {
    try {
      const data = await new API('get', 'sprzet/rodzaj', {}).call();

      this.rodzaje = data.map((item: any) => ({
        rodzajSezonu: item.rodzaj_sezonu,
        nazwa: item.nazwa,
      }));
    } catch (error) {
      console.error('error', error);

      throw error;
    }
  }
}
</script>

<style lang="scss" scoped>
.dataContainer {
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
}

.column {
  display: flex;
  flex-direction: column;
  width: 350px;
  margin-right: 64px;
}

.cechaContainer {
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 50px;
}

.row {
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  margin-left: 0;
}

.button {
  display: flex;
  width: 250px;
  margin-top: 15px;
}

.input {
  margin-bottom: 15px;
}

.inputCecha {
  margin-right: 15px;
}

#table {
  width: 500px;
}
</style>

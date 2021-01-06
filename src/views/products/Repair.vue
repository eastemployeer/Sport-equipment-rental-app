<template>
  <div class="viewPadding">
    <div class="infoSegment">
      <div class='column'>
        <div class="textInfoContainer">
          <span class="textInfoLabel">Rodzaj sprzętu</span>
          <span class="textInfoValue">{{ product.rodzajSprzetu.nazwa }}</span>
        </div>
        <div class="textInfoContainer" :style="{ marginTop: '23px' }">
          <span class="textInfoLabel">Cena za dzień</span>
          <span class="textInfoValue">{{ product.cenaWypozyczeniaDzien + ' zł'}}</span>
        </div>
        <div class="textInfoContainer" :style="{ marginTop: '23px' }">
          <span class="textInfoLabel">Wartość sprzętu</span>
          <span class="textInfoValue">{{ product.wartoscSprzetu + ' zł'}}</span>
        </div>
        <div class="textInfoContainer" :style="{ marginTop: '23px' }">
          <span class="textInfoLabel">Ilość wypożyczeń</span>
          <span class="textInfoValue">{{ '???'}}</span>
        </div>
      </div>
      <div class='column'>
        <div class="textInfoContainer" :style="{ marginTop: '23px' }">
          <span class="textInfoLabel">Rocznik</span>
          <span class="textInfoValue">{{ product.rocznik }}</span>
        </div>
        <div class="textInfoContainer" :style="{ marginTop: '23px' }">
          <span class="textInfoLabel">Id sprzętu</span>
          <span class="textInfoValue">{{ product.id }}</span>
        </div>
        <div class="textInfoContainer" :style="{ marginTop: '23px' }">
          <span class="textInfoLabel">Ilość napraw</span>
          <span class="textInfoValue">{{ '???'}}</span>
        </div>
      </div>
    </div>
    <div class="col-md-2" :style="{ padding: '0px', marginTop: '15px' }">
      <Input
        v-model="repairKoszt"
        label="Koszt naprawy"
        placeholder="123"
        :max="11"
      />
    </div>
    <div class="col-md-4" :style="{ padding: '0px', margin: '15px 0' }">
      <Input
        v-model="repairDesc"
        label="Opis naprawy"
        placeholder="Opis naprawy"
        :multiline="true"
        :max="1000"
      />
    </div>
    <b-button
      v-on:click='addRepair'
      variant="primary"
    >Dodaj naprawę</b-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Input from '@/components/Input.vue';

import Product from '@/models/Product';
import API from '@/services/API';
import EventBus from '@/services/EventBus';
import store from '@/store';

@Component({
  components: {
    Input,
  },
})
export default class ProductRepair extends Vue {
  private product: Product = new Product();

  private repairKoszt = 0;

  private repairDesc = '';

  private mounted() {
    this.loadProduct(this.$route.params.id);
    this.setViewTitle();
  }

  private async addRepair() {
    try {
      const data = await new API('post', 'naprawa', {
        body: {
          sprzetId: this.product.id,
          koszt: this.repairKoszt,
          opis: this.repairDesc,
        },
      }).call(true);

      if (data.status === 400) {
        alert('Wprowadzono błędne dane');
      } else if (data.status === 201) {
        this.$router.back();
        alert('Dodano naprawę');
      } else {
        alert('Nieznany błąd');
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  private async loadProduct(id: any) {
    try {
      const data = await new API('get', `sprzet/${id}`, {}).call();

      this.product = new Product(data);
    } catch (error) {
      console.error('error', error);
    }
  }

  private async setViewTitle() {
    await EventBus.$emit('layout-view', { title: 'Szczegóły naprawy sprzętu' });
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
  width: 500px;
}
</style>

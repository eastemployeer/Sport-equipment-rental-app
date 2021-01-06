<template>
  <div class="container">
    <div class="row">
      <div class="form-group col-md-6">
          <label for="nazwa" class="textLabel">Nazwa usługi</label>
          <input  v-model="value.nazwa" type="text" id="nazwa" class="form-control" placeholder="Nazwa usługi"/>
      </div>
      <div class="form-group col-md-6">
          <label for="czasWykonania" class="textLabel">Przybliżony czas wykonania usługi</label>
          <input  v-model="value.szacowanyCzasWykonania" type="number" id="czasWykonania" class="form-control" placeholder="1 dzień"/>
      </div>
    </div>
    <div class="row">
        <div class="form-group col-md-6">
          <label for="cena" class="textLabel">Cena</label>
          <input  v-model="value.cena" type="number" id="cena" class="form-control" placeholder="60"/>
        </div>
        <div class="form-group col-md-6 text-center my-auto">
          <button type="button" class="btn btn-lg btn-primary"  v-on:click="buttonOnClick">{{buttonLabel}}</button>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Service from '@/models/Service';

@Component
export default class CreateService extends Vue {
/*  private price = 0;

  private timeToDo = 0;

  private name = '';

  private buttonName = ''; */

@Prop()
  value!: Service;

@Prop()
buttonLabel!: string;

@Prop() buttonOnClick!: () => void;

  /* private setButtonType() {
  if (this.$route.params.operationType === 'create') { this.buttonName = 'Dodaj nową usługę serwisową'; } else {
    this.buttonName = 'Zapisz zmiany';
    this.price = this.priceP;
    this.timeToDo = this.time;
    this.name = this.nameP;
  }
}

private async setViewTitle() {
  await EventBus.$emit('layout-view', { title: 'Kreator usługi serwisowej' });
}

private mounted() {
  this.setViewTitle();
  this.setButtonType();
}

private editService() {

} */
}
</script>
<style lang="scss" scoped>
.contentContainer {
  align-self: center;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.smallContainer {
  display:flex;
  flex-direction: row;
  align-self: center;
}
</style>

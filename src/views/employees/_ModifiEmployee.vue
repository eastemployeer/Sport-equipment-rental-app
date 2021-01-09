<template>
  <div class="container">
    <div class="row">
       <div class="form-group col-md-6">
          <label for="imie" class="textLabel">Imię</label>
          <input  v-model="value.imie" type="text" id="imie" class="form-control" placeholder="Jan"/>
        </div>
         <div class="form-group col-md-6">
          <label for="nazwisko" class="textLabel">Nazwisko</label>
          <input  v-model="value.nazwisko" type="text" id="nazwisko" class="form-control" placeholder="Kowalski"/>
        </div>
    </div>
    <div class="row">
       <div class="form-group col-md-6">
          <label for="haslo" class="textLabel">Hasło</label>
          <input  v-model="value.haslo" type="text" id="haslo" class="form-control" placeholder="Hasło"/>
        </div>
         <div class="form-group col-md-6">
          <label for="login" class="textLabel">Login</label>
          <input  v-model="value.login" type="text" id="login" class="form-control" placeholder="Login"/>
        </div>
    </div>
    <div class="row">
       <div class="form-group col-md-6">
          <label for="stanowisko" class="textLabel">Stanowisko</label>
          <select class="custom-select" id="stanowisko" v-model="value.typKonta">
            <option value="PRACOWNIK">Pracownik</option>
            <option value="SERWISANT">Serwisant</option>
            <option value="KIEROWNIK">Kierownika</option>
          </select>
        </div>
        <div class="form-group col-md-6">
          <label for="blokada" class="textLabel">Blokada konta</label>
          <select class="custom-select" id="blokada" v-model="value.blokada">
            <option :value="1">Zablokowane</option>
            <option :value="0">Odblokowane</option>
          </select>
        </div>
    </div>
    <div class="row">
      <button type="button" style="margin-top: 20px;" class="btn btn-primary" v-on:click="buttonOnClick">Zapisz zmiany</button>
    </div>
    {{value.data}}
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Employee from '@/models/Employee';

@Component
export default class ModifyEmployee extends Vue {
  @Prop()
    value!: Employee;

  @Prop()
    buttonOnClick!: () => void;
}
</script>
<style lang="scss" scoped>
.row {
  margin-top: 20px;
}
</style>

<template>
  <div>
    <EmployeeModify
      v-model="employee"
      v-bind:buttonOnClick="updateEmployee"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import EmployeeModify from './_ModifiEmployee.vue';

import Employee from '@/models/Employee';
import API from '@/services/API';
import EventBus from '@/services/EventBus';

@Component({
  components: {
    EmployeeModify,
  },
})
export default class EditEmployee extends Vue {
  private employee : Employee = new Employee();

  private mounted() {
    this.loadEmployeeAndsetViewTitle();
  }

  private async updateEmployee() {
    try {
      const data = await new API('post', `pracownik/${this.$route.params.id}`, {
        body: {
          typKonta: this.employee.typKonta,
          imie: this.employee.imie,
          nazwisko: this.employee.nazwisko,
          login: this.employee.login,
          haslo: this.employee.haslo,
          blokada: this.employee.blokada,
        },
      }).call(true);

      if (data.status === 400) {
        alert('Wystąpił błąd, sprawdz wprowadzone dane');
      } else if (data.status === 201) {
        this.$router.back();
        alert('Zaktualizowano dane pracownika');
      } else {
        alert('Nieznany błąd');
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  private async loadEmployeeAndsetViewTitle() {
    // load employee
    try {
      const data = await new API('get', `pracownik/${this.$route.params.id}`, {}).call();
      this.employee = new Employee(data);
    } catch (error) {
      console.error('error', error);
    }
    // set viewtitle
    await EventBus.$emit('layout-view', { title: `Edycja pracownika: ${this.employee.imie} ${this.employee.nazwisko} ` });
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

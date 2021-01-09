<template>
  <EmployeeModify v-model="employee" :buttonOnClick="addNewEmployee" />
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
export default class CreateEmployee extends Vue {
  private employee : Employee = new Employee();

  private async setViewTitle() {
    await EventBus.$emit('layout-view', { title: 'Dodawanie pracownika' });
  }

  private mounted() {
    this.setViewTitle();
  }

  private async addNewEmployee() {
    if (this.employee.typKonta !== '' && this.employee.imie !== '' && this.employee.nazwisko !== '' && this.employee.login !== '') {
      try {
        const data = await new API('post', 'pracownik', {
          body: {
            typKonta: this.employee.typKonta,
            imie: this.employee.imie,
            nazwisko: this.employee.nazwisko,
            login: this.employee.login,
            haslo: this.employee.haslo,
          },
        }).call(true);
        if (data.status === 400) {
          alert('Wystąpił błąd, sprawdz wprowadzone dane');
        } else if (data.status === 201) {
          this.$router.back();
          alert('Dodano nowego pracownika');
        } else {
          alert(`Nieznany błąd ${data.status}`);
        }
      } catch (error) {
      // eslint-disable-next-line no-alert
        alert('Nie dodano nowego pracownika');
        console.error('error', error);
      }
    } else { alert('Nie podano wszystkich danych!'); }
  }
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

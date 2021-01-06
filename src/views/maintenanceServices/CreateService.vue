<template>
  <ServiceModify v-model="service" v-bind:buttonOnClick="addNewService" buttonLabel="Dodaj nową usługę serwisową"/>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ServiceModify from './_ModifiService.vue';

import Service from '@/models/Service';
import API from '@/services/API';
import EventBus from '@/services/EventBus';

@Component({
  components: {
    ServiceModify,
  },
})
export default class CreateService extends Vue {
  private service : Service = new Service();

  private async setViewTitle() {
    await EventBus.$emit('layout-view', { title: 'Kreator usługi serwisowej' });
  }

  private mounted() {
    this.setViewTitle();
  }

  private async addNewService() {
    if (this.service.cena !== 0 && this.service.szacowanyCzasWykonania !== 0 && this.service.nazwa !== null) {
      try {
        const data = await new API('post', 'uslugaSerwisowa', {
          body: {
            nazwa: this.service.nazwa,
            czas: this.service.szacowanyCzasWykonania,
            cena: this.service.cena,
          },
        }).call(true);
        if (data.status === 400) {
          alert('Wystąpił błąd, sprawdz wprowadzone dane');
        } else if (data.status === 201) {
          this.$router.back();
          alert('Wstawiono nową usługę');
        } else {
          alert(`Nieznany błąd ${data.status}`);
        }
      } catch (error) {
      // eslint-disable-next-line no-alert
        alert('Nie stworzono nowej usługi serwisowej');
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

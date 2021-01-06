<template>
  <div>
    <ServiceModify
      v-model="service"
      buttonLabel="Zapisz zmiany"
      v-bind:buttonOnClick="updateService"/>
  </div>
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
export default class EditService extends Vue {
  private service: Service = new Service();

  private mounted() {
    this.loadService();
    this.setViewTitle();
  }

  private async loadService() {
    try {
      const data = await new API('get', 'uslugaSerwisowa', {
        query: {
          limit: 30, // abstract value
          offset: 0,
        },
      }).call();
      const item = data.filter((element : any) => element.id === this.$route.params.id)[0];
      this.service = new Service(item);
    } catch (error) {
      console.error('error', error);
    }
  }

  private async updateService() {
    try {
      const data = await new API('post', `uslugaSerwisowa/${this.$route.params.id}`, {
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
        alert('Zaktualizowano usługę');
      } else {
        alert('Nieznany błąd');
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  private async setViewTitle() {
    await EventBus.$emit('layout-view', { title: 'Kreator usługi serwisowej' });
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

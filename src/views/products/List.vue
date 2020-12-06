<template>
  <div class="view list">
    <div class="list-table">
      <b-table sticky-header hover head-variant="light" :fields="fields" :items="products">
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>

        <template #cell(id)="data">
          <router-link :to="{ name: 'product-details', params: { id: data.value.id } }">
            <b-icon-arrow-right scale="1.5"/>
          </router-link>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ProductList extends Vue {
  private products: any[] = [];

  private fields: string[] = [];

  private mounted() {
    this.fields = [{ key: 'index', label: 'L.p' }, 'age', 'first_name', 'last_name', { key: 'id', label: '' }];
    this.products = [
      {
        age: 40, first_name: 'Dickerson', last_name: 'Macdonald', id: 1,
      },
      {
        age: 21, first_name: 'Larsen', last_name: 'Shaw', id: 2,
      },
      {
        age: 89, first_name: 'Geneva', last_name: 'Wilson', id: 3,
      },
      {
        age: 38, first_name: 'Jami', last_name: 'Carney', id: 4,
      },
    ];
    console.log('test');
  }
}
</script>

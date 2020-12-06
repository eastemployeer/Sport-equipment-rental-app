<template>
  <div class="view list">
    <div class="list-table">
      <div class="table-head">
          TEST
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ProductList extends Vue {
  private products: string[] = [];

  private mounted() {
    console.log('test');
  }
}
</script>

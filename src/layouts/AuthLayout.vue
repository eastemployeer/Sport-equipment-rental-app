<template>
  <div id="authLayout">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AuthLayout extends Vue {}
</script>

<style scoped lang="scss">
#authLayout {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>

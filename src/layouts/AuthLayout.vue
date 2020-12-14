<template>
  <div id="authLayout">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import SideBar from '@/components/SideBar.vue';

import EventBus from '@/services/EventBus';

@Component({
  components: {
    SideBar,
  },
})
export default class AuthLayout extends Vue {
  private viewTitle = '';

  private created() {
    EventBus.$on('layout-view-title', this.changeViewTitle);
  }

  private beforeDestroy() {
    EventBus.$off('layout-view-title', this.changeViewTitle);
  }

  private changeViewTitle(viewTitle: string) {
    this.viewTitle = viewTitle;
  }
}
</script>

<style scoped lang="scss">
#authLayout {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>

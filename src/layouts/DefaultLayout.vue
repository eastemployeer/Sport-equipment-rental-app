<template>
  <div id="defaultLayout">
    <SideBar/>
    <div id="view">
      <div id="viewTitle">{{ viewTitle }}</div>
      <div id="routerView">
        <router-view/>
      </div>
    </div>
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
export default class DefaultLayout extends Vue {
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
#defaultLayout {
  display: flex;
  flex-direction: row;
  height: 100%;
}

#view {
  width: 100%;
  height: 100%;
}

#viewTitle {
  margin-top: 56px;
  margin-left: 44px;
  font-size: 40px;
  font-weight: bold;
  line-height: 46px;
  color: #25282B;
  letter-spacing: 0.2px;
}

#routerView {
  height: calc(100% - 184px);
  // padding: 46px;
  margin: 44px;
  background: #FFF;
  border-radius: 8px;
  box-shadow: 0 12px 26px rgba(16, 30, 115, 0.06)
}
</style>

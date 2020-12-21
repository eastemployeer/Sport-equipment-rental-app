<template>
  <div id="defaultLayout">
    <SideBar/>
    <div id="view">
      <div id="viewTitle">{{ viewTitle }}</div>
      <b-button
        v-if='buttonShow'
        v-on:click='buttonOnPress'
        variant="primary"
        id="layoutButton"
      >{{ buttonText }}</b-button>
      <div id="routerView" :style="{ marginTop: buttonShow ? '18px' : '56px' }">
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

  private buttonShow = false;

  private buttonText = '';

  private buttonOnPress = null;

  private created() {
    EventBus.$on('layout-view', this.changeViewData);
  }

  private beforeDestroy() {
    EventBus.$off('layout-view', this.changeViewData);
  }

  private changeViewData(data: any) {
    this.viewTitle = data.title;
    this.buttonShow = data.show ? data.show : false;
    this.buttonText = data.text ? data.text : '';
    this.buttonOnPress = data.onPress ? data.onPress : null;
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

#layoutButton {
  margin-left: 44px;
  overflow: hidden;
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

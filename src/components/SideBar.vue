<template>
  <div class="sidebar">
    <span class="panelName">Panel klienta</span>
    <span class="userName">userName</span>
    <span class="userEmail">userEmail</span>
    <div class="divider"/>

    <div class="buttons">
      <div class="button">
        <div class="buttonIcon">
          <b-icon-list-ul/>
        </div>
        <div class="buttonText">
          Lista sprzętów
        </div>
      </div>

    </div>

    <div id="logoutSegment">
      <div class="divider"/>
      <b-button pill variant="outline-secondary" id="logoutButton" v-on:click="logout">
        <div class="buttonIcon">
          <b-icon-door-open/>
        </div>
        <div class="buttonText">
          Wyloguj
        </div>
      </b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {
  private logout() {
    console.log('logout');
  }
}
</script>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  width: 15%;
  height: 100%;
  padding: 22px;
  padding-bottom: 0;
  background: #FFF;
  box-shadow: 6px 0 18px rgba(0, 0, 0, 0.06);
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #EBEFF2;
}

.panelName {
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  color: #109CF1;
}

.userName {
  margin-top: 22px;
  font-size: 14px;
  line-height: 21px;
  color: #192A3E;
}

.userEmail {
  margin-bottom: 33px;
  font-size: 11px;
  font-weight: 500;
  line-height: 16px;
  color: #90A0B7;
}

.buttons {
  margin-top: 14px;
}

.button {
  display: flex;
  flex-direction: row;
  padding: 10px;
}

.buttonIcon {
  width: 20px;
}

.buttonText {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  font-size: 13px;
  line-height: 19px;
  color: #334D6E;
  letter-spacing: 0.01em;
}

#logoutSegment {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-content:flex-end;
  align-items: flex-end;
}

#logoutButton {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 20px;
  margin: 18px auto;
}
</style>

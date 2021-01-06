<template>
  <div class="sidebar">
    <router-link :to="{name: 'ProductList'}" class="panelName">{{panelName}}</router-link>
    <span class="userName">{{userName}}</span>
    <span class="userEmail">{{userEmail}}</span>
    <div class="divider"/>

      <div style="cursor: pointer;" v-on:click="makeAction" class="button">
        <div class="buttonIcon">
           <component :is="btnIcon[0]"/>
        </div>
        <div class="buttonText">
          {{button1Text}}
        </div>
      </div>

      <div style="cursor: pointer;" v-if="panelName != 'Panel pracownika'" class="button">
        <div class="buttonIcon">
           <component :is="btnIcon[1]"/>
        </div>
        <div class="buttonText">
          {{button2Text}}
        </div>
      </div>

      <router-link style="cursor: pointer;" :to="{name: 'ServiceList'}" tag="div" v-if="panelName === 'Panel kierownika' || panelName === 'Panel klienta'" class="button">
        <div class="buttonIcon">
           <component :is="btnIcon[2]"/>
        </div>
        <div class="buttonText">
          {{button3Text}}
        </div>
      </router-link>

      <div style="cursor: pointer;" v-if="panelName === 'Panel kierownika' || panelName === 'Panel klienta'" class="button">
        <div class="buttonIcon">
           <component :is="btnIcon[3]"/>
        </div>
        <div class="buttonText">
          {{button4Text}}
        </div>
      </div>

      <div style="cursor: pointer;" v-if="panelName === 'Panel kierownika' || panelName === 'Panel klienta'" class="button">
        <div class="buttonIcon">
           <component :is="btnIcon[4]"/>
        </div>
        <div class="buttonText">
          {{button5Text}}
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

import store from '@/store';
import { AuthAction } from '@/store/modules/AuthModule';

@Component
export default class SideBar extends Vue {
  // docelowo wynik zapytania
 private userName = 'Adam Kowalski';

  private userEmail = '';

  private panelName = 'Panel klienta';

  private button1Text = '';

  private button2Text ='';

  private button3Text= '';

  private button4Text = '';

  private button5Text = '';

  private btnIcon : string[] = [];

  private toServiceList() {
    this.$router.push({ name: 'ServiceList' });
  }

  private logout() {
    store.dispatch(AuthAction.Logout).then(() => {
      this.$router.replace({ name: 'Login' });
    });
  }

  private makeAction() {
    if (this.panelName === 'Panel klienta') {
      this.$router.push({ name: 'MyCart' });
    }
  }

  private buttonsConfiguration() {
    // const DOMiconBtn1 = document.querySelector('.btn1-icon');

    if (this.panelName === 'Panel klienta') {
      this.button1Text = 'Mój koszyk';
      this.button2Text = 'Katalog sprzętów';
      this.button3Text = 'Lista usług serwisowych';
      this.button4Text = 'Serwisy moich sprzętów';
      this.button5Text = 'Moje wypożyczenia';

      this.btnIcon[0] = 'b-icon-cart3';
      this.btnIcon[1] = 'b-icon-book';
      this.btnIcon[2] = 'b-icon-list';
      this.btnIcon[3] = 'b-icon-tools';
      this.btnIcon[4] = 'b-icon-archive';
    } else if (this.panelName === 'Panel kierownika') {
      this.button1Text = 'Katalog sprzętów';
      this.button2Text = 'Lista pracowników';
      this.button3Text = 'Lista usług serwisowych';
      this.button4Text = 'Statystyki wypozyczalni';
      this.button5Text = 'Lista wypożyczeń';

      this.btnIcon[0] = 'b-icon-book';
      this.btnIcon[1] = 'b-icon-person-circle';
      this.btnIcon[2] = 'b-icon-list';
      this.btnIcon[3] = 'b-icon-graph-up';
      this.btnIcon[4] = 'b-icon-list';
    } else if (this.panelName === 'Panel pracownika') {
      this.button1Text = 'Lista wypożyczeń';

      this.btnIcon[0] = 'b-icon-list';
    } else if (this.panelName === 'Panel serwisanta') {
      this.button1Text = 'Katalog sprzętów';
      this.button2Text = 'Lista serwisów sprzętów klientów';

      this.btnIcon[0] = 'b-icon-book';
      this.btnIcon[1] = 'b-icon-list';
    }
  }

  private mounted() {
    if (store.state.auth.accountType === 'PRACOWNIK') {
      this.panelName = 'Panel pracownika';
    } else if (store.state.auth.accountType === 'KLIENT') {
      this.panelName = 'Panel klienta';
    } else if (store.state.auth.accountType === 'KIEROWNIK') {
      this.panelName = 'Panel kierownika';
    } else if (store.state.auth.accountType === 'SERWISANT') {
      this.panelName = 'Panel serwisanta';
    }

    this.userName = `${store.state.auth.currentUser?.imie} ${store.state.auth.currentUser?.nazwisko}`;
    if (store.state.auth.accountType === 'KLIENT') {
      this.userEmail = `${store.state.auth.currentUser?.email}`;
    }

    this.buttonsConfiguration();
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
  display: flex;
flex-direction: column;
  margin-top: 14px;
}

.button {
  display: flex;
  flex-direction: row;
  margin: 10px;
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

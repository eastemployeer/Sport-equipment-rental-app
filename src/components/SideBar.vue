<template>
  <div class="sidebar">
    <router-link :to="{name: 'ProductList'}" class="panelName">{{panelName}}</router-link>
    <span class="userName">{{userName}}</span>
    <span class="userEmail">{{userEmail}}</span>
    <div class="divider"/>

    <div v-for="(icon, index) in btnIcon" :key="icon">
      <div v-on:click="makeAction(index)" class="button">
        <div class="buttonIcon">
           <component :is="btnIcon[index]"/>
        </div>
        <div class="buttonText">
          {{buttonText[index]}}
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

import store from '@/store';
import { AuthAction } from '@/store/modules/AuthModule';

@Component
export default class SideBar extends Vue {
  private userName = 'Adam Kowalski';

  private userEmail = '';

  private panelName = 'Panel klienta';

  private buttonText : string[] = [];

  private btnIcon : string[] = [];

  private toServiceList() {
    this.$router.push({ name: 'ServiceList' });
  }

  private logout() {
    store.dispatch(AuthAction.Logout).then(() => {
      this.$router.replace({ name: 'Login' });
    });
  }

  private makeAction(number: number) {
    if (number === 0) {
      this.goToProductList();
    } else if (number === 1) {
      if (this.panelName === 'Panel klienta') {
        this.goToMyCart();
      } else if (this.panelName === 'Panel kierownika') {
        this.goToEmployeesList();
      } else if (this.panelName === 'Panel serwisanta') {
        this.goToMyServiceList();
      }
    } else if (number === 2) {
      this.goToServiceList();
    } else if (number === 3) {
      if (this.panelName !== 'Panel kierownika') {
        this.goToMyServiceList();
      }
    } else {
      this.goToRentalsList();
    }
  }

  private goToRentalsList() {
    this.$router.push({ name: 'RentalsList' });
  }

  private goToMyCart() {
    this.$router.push({ name: 'MyCart' });
  }

  private goToEmployeesList() {
    this.$router.push({ name: 'EmployeesList' });
  }

  private goToServiceList() {
    this.$router.push({ name: 'ServiceList' });
  }

  private goToMyServiceList() {
    this.$router.push({ name: 'ClientServiceList' });
  }

  private goToProductList() {
    this.$router.push({ name: 'ProductList' });
  }

  private buttonsConfiguration() {
    if (this.panelName === 'Panel klienta') {
      this.buttonText[0] = 'Katalog sprzętów';
      this.buttonText[1] = 'Mój koszyk';
      this.buttonText[2] = 'Lista usług serwisowych';
      this.buttonText[3] = 'Serwisy moich sprzętów';
      this.buttonText[4] = 'Moje wypożyczenia';

      this.btnIcon[0] = 'b-icon-book';
      this.btnIcon[1] = 'b-icon-cart3';
      this.btnIcon[2] = 'b-icon-list';
      this.btnIcon[3] = 'b-icon-tools';
      this.btnIcon[4] = 'b-icon-archive';
    } else if (this.panelName === 'Panel kierownika') {
      this.buttonText[0] = 'Katalog sprzętów';
      this.buttonText[1] = 'Lista pracowników';
      this.buttonText[2] = 'Lista usług serwisowych';
      this.buttonText[3] = 'Statystyki wypozyczalni (wkrótce)';
      this.buttonText[4] = 'Lista wypożyczeń';

      this.btnIcon[0] = 'b-icon-book';
      this.btnIcon[1] = 'b-icon-person-circle';
      this.btnIcon[2] = 'b-icon-list';
      this.btnIcon[3] = 'b-icon-graph-up';
      this.btnIcon[4] = 'b-icon-list';
    } else if (this.panelName === 'Panel pracownika') {
      this.buttonText[0] = 'Lista wypożyczeń';

      this.btnIcon[0] = 'b-icon-list';
    } else if (this.panelName === 'Panel serwisanta') {
      this.buttonText[0] = 'Katalog sprzętów';
      this.buttonText[1] = 'Lista serwisów sprzętów klientów';

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
  color: #2c3e50;
  cursor: pointer;
}
.button:hover {
  text-decoration: underline;

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

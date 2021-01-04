<template>
  <div class="authView">
    <div class="container">
      <div :style="{ display: 'flex', flexDirection: 'column', alignItems: 'center' }">
        <span class="infoMain">Wypożyczalnia</span>
        <span class="infoSub">Logowanie do systemu</span>
        <span class="infoLoginType" v-if="loginType === 'PRACOWNIK'">Logujesz się jako pracownik</span>
      </div>

      <div :style="{ marginTop: '63px' }">
        <Input
          v-model="emailLogin"
          :label="loginType === 'PRACOWNIK' ? 'Login' : 'Email'"
          :placeholder="loginType === 'PRACOWNIK' ? 'Login' : 'Email'"
        />
        <Input
          :style="{ marginTop: '10px' }"
          v-model="password"
          inputType="password"
          label="Hasło"
          placeholder="Hasło"
        />
      </div>

      <span
        class="changeTypeBtn"
        v-if="loginType === 'KLIENT'"
        v-on:click="loginType = 'PRACOWNIK'"
      >Kliknij tu by zalogować się jako pracownik</span>
      <span
        class="changeTypeBtn"
        v-else
        v-on:click="loginType = 'KLIENT'"
      >Kliknij tu by zalogować się jako klient</span>
      <router-link :to="{name: 'Register'}"  class="changeTypeBtn">
        Kliknij tu by się zarejestrować</router-link>

      <b-button
        v-on:click='login'
        variant="primary"
        :style="{ marginTop: '5px' }"
      >Zaloguj się</b-button>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

import Input from '@/components/Input.vue';

import store from '@/store';
import { AuthAction } from '@/store/modules/AuthModule';

@Component({
  components: {
    Input,
  },
})
export default class Login extends Vue {
  private emailLogin = '';

  private password = '';

  private loginType = 'KLIENT';

  private login() {
    if (this.loginType === 'PRACOWNIK') {
      const data = {
        login: this.emailLogin,
        password: this.password,
      };

      store.dispatch(AuthAction.AttemptLoginPracownik, data).then(() => {
        this.$router.push({ name: 'ProductList' });
      });
    } else {
      const data = {
        email: this.emailLogin,
        password: this.password,
      };

      store.dispatch(AuthAction.AttemptLoginKlient, data).then(() => {
        this.$router.push({ name: 'ProductList' });
      });
    }
  }
}
</script>

<style scoped lang='scss'>
.container {
  display: flex;
  flex-direction: column;
  width: 362px;
  padding: 45px;
  background: #D7E0FF;
  border-radius: 30px;
}

.infoMain {
  font-size: 36px;
  font-weight: bold;
  line-height: 46px;
  letter-spacing: 0.2px;
}
.infoSub {
  margin-top: 16px;
  font-size: 22px;
  font-weight: bold;
  line-height: 34px;
  letter-spacing: 0.2px;
}

.changeTypeBtn {
  align-self: center;
  margin-top: 50px;
  font-size: 13px;
  color: gray;
  text-decoration: underline;
}
</style>

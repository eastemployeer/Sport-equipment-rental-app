<template>
  <div class="container">
    <div class="box">
      <h2 class="text-center" style="margin-top: 50px; margin-bottom: 0;">Wypożyczalnia</h2>
      <h4 class="text-center" style="margin-top: 10px;">Rejestracja</h4>
      <div class="smallContainer">
        <div class="col-md-6 inputContainer">
          <div class="form-group" v-for="(labelVal, index) in labelVals" :key="labelVal">
            <label :for="labelVal" class="textLabel">{{labelVal}}</label>
            <input  v-model="values[index]" type="text" :id="labelVal" class="form-control" :placeholder="labelVal"/>
          </div>
        </div>

        <div class="col-md-6 inputContainer">
          <div class="form-group" v-for="labelVal in labelVals1" :key="labelVal">
            <label :for="labelVal" class="textLabel">{{labelVal}}</label>
            <input v-model="values[index+3]" type="text" :id="labelVal" class="form-control" :placeholder="labelVal"/>
          </div>
        </div>
      </div>
      <div class="text-center" style="margin-top: 61px;">
          <button type="button" class="btn btn-lg btn-primary" v-on:click="register">Zarejestruj się</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelVals: [
        'Imię',
        'Nazwisko',
        'Telefon',
      ],
      labelVals1: [
        'Email',
        'Hasło',
        'Powtórz hasło',
      ],
      values: [], // kolejno imię, nazwisko, telefon, email, hasło, powtórz-hasło
    };
  },
  methods: {
    register() {

    },
  },
};
</script>
<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  width: 100%;
}
h2 {
  font-size: 40px;
  font-weight: bold;
  line-height: 46px;
  color: #25282B;
  letter-spacing: 0.2px;
}
h4 {
font-size: 26px;
font-style: normal;
font-weight: bold;
line-height: 34px;

/* Neutral / Black */
color: #25282B;

/* identical to box height, or 131% */
letter-spacing: 0.2px;
}
.smallContainer {
  display: flex;
  flex-direction: row;
}
.inputContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box {
display: flex;
flex-direction: column;
width: 910px;
height: 627px;
background: #D7E0FF;
border-radius: 30px;
}
</style>

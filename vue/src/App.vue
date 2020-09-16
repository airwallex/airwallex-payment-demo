<template>
  <div id="app">
    <img src="./assets/logo.png"><br>
    Intent ID: <input type="text" name="intentID" v-model="intentID"/>
    <button id="test" @click="getIntentId()">submit</button>
    <router-view/>
  </div>
</template>

<script>
// import { loadAirwallex } from 'airwallex-payment-elements';

const client_secret = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1YTE3Njc5My01ODRmLTQ3MDktYTA0Ni00YzY0ZTI4OTM2OTgiLCJzdWIiOiJ1c2VyMTIzNCIsImlhdCI6MTU5Nzc0MzU3OSwiZXhwIjoxNTk4MTAzNTc5LCJhY2NvdW50X2lkIjoiMzQ5ZmFhZDktNjNkYS00ODcxLTlhNWEtYjJhMjE2NWI1M2I2IiwiZGF0YV9jZW50ZXJfcmVnaW9uIjoiSEsifQ.gkqTYJ-UjIhVN9GItS5Zn5cnXxlruzSahFjetr1UPBs';

export default {
  name: 'App',
  // beforeCreate: function () {
  //   console.log('test!!!!!');
  //   console.log(loadAirwallex);
  //   loadAirwallex({
  //     env: 'staging', // 'staging' | 'demo' | 'prod'
  //   });
  // },
  data () {
    return {
      intentID: 'int_nvuCh66cznTII2pShzAW9m4Zj5j',
      client_secret
    }
  },
  methods: {
    getIntentId: function () {
      var temp = this.intentID;//获取值
      alert(temp); //显示
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

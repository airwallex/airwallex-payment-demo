<template>
  <div class="wechatEle">
    <h1>{{msg}}</h1>
    <!-- HPP -->
    <h2>{{desc}}</h2>
    <div id='wechat'></div>
  </div>
</template>

<script>
import {createElement, loadAirwallex} from 'airwallex-payment-elements';

const client_secret = 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDA4NDEwMTIsImV4cCI6MTYwMDg0NDYxMiwiYWNjb3VudF9pZCI6IjM0OWZhYWQ5LTYzZGEtNDg3MS05YTVhLWIyYTIxNjViNTNiNiIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IlVLIiwiaW50ZW50X2lkIjoiaW50XzdwbWh2R0E0emRjeG54NWFRekpUdXlPT1RaVCJ9.pEI4__GiYriDS7Ws1PxHsGOnqSR3Ca9_LLNcWEaUzOA';
const intentid = 'int_7pmhvGA4zdcxnx5aQzJTuyOOTZT';

console.log(loadAirwallex);
loadAirwallex({
  env: 'staging', // 'staging' | 'demo' | 'prod'
  origin: window.location.origin
}).then(() => {
  // Create and mount 'wechat' element
  const wechat = createElement('wechat', {
    intent: { // Required, dropIn use intent Id and client_secret to prepare checkout
      id: intentid,
      client_secret: client_secret
    }
  });
  wechat.mount('wechat');

  window.addEventListener('onSuccess', (event) => {
    console.log(JSON.stringify(event.detail));
    alert(JSON.stringify(event.detail));
  });
})

export default {
  name: 'WechatEle',
  data () {
    return {
      msg: 'Airwallex checkout integration',
      desc: 'Option #5: Wechat elements integrationn'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  font-weight: 300;
}
h1 {
  text-align: center;
}
h2 {
  padding-top: 24px;
}
label {
  padding: 12px;
  display: block;
}
div {
  padding: 12px;
}
</style>

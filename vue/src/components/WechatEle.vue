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

const client_secret = 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTk0ODQ2MTYsImV4cCI6MTU5OTQ4ODIxNiwiYWNjb3VudF9pZCI6IjM0OWZhYWQ5LTYzZGEtNDg3MS05YTVhLWIyYTIxNjViNTNiNiIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IlVLIiwiaW50ZW50X2lkIjoiaW50X2hIcVJ3V3FQemRVZmIxaksxenZYcjVmQVVFRCJ9.cfaknIuwRSirnaglshZlplKOxTin2TmoW0hdbBkSDd4';
const intentid = 'int_hHqRwWqPzdUfb1jK1zvXr5fAUED';

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

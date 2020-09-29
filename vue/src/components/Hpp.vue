<template>
  <div class="hpp">
    <h1>{{msg}}</h1>
    <!-- HPP -->
    <h2>{{desc}}</h2>
    <button id='hpp' @click="redirectHpp()">Redirect to HPP</button>
  </div>
</template>

<script>
import { redirectToCheckout,loadAirwallex } from 'airwallex-payment-elements';

const client_secret = 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTk0NjUwMjQsImV4cCI6MTU5OTQ2ODYyNCwiYWNjb3VudF9pZCI6IjM0OWZhYWQ5LTYzZGEtNDg3MS05YTVhLWIyYTIxNjViNTNiNiIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IlVLIiwiaW50ZW50X2lkIjoiaW50X2RuanNLUmJRemtxOTgxUUQ3ejc0QUdZNXRpSSJ9.wIjljTBGpbt1TRsQOKtOjwJlhKcLNE_NscPaQ1Ws5fk';
const intentid = 'int_dnjsKRbQzkq981QD7z74AGY5tiI';

console.log(loadAirwallex);
loadAirwallex({
  env: 'staging', // 'staging' | 'demo' | 'prod'
});

const redirectHpp = async () => {
  await redirectToCheckout({
    env: 'staging',
    id: intentid,
    client_secret: client_secret,
    component: 'default',
    autoCapture: true,
    successUrl: 'https://www.baidu.com/',
    failUrl: window.location.href,
    withBilling: true,
    theme: {
      variant: 'bootstrap',
      src: 'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',
      family: 'AxLLCircular',
      weight: '500',
      popupWidth: 418,
      popupHeight: 549,
    },
  });
};

export default {
  name: 'Hpp',
  data () {
    return {
      msg: 'Airwallex checkout integration',
      desc: 'Option #1: Hosted payment page (HPP) integration',
      redirectHpp
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

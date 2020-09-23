<template>
  <div class="card">
    <h1>{{msg}}</h1>
    <!-- HPP -->
    <h2>{{desc}}</h2>
    <div id='fullFeaturedCard'></div>
  </div>
</template>

<script>
import {createElement, loadAirwallex} from 'airwallex-payment-elements';

const client_secret = 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDA4NDEzNDAsImV4cCI6MTYwMDg0NDk0MCwiYWNjb3VudF9pZCI6IjM0OWZhYWQ5LTYzZGEtNDg3MS05YTVhLWIyYTIxNjViNTNiNiIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IlVLIiwiaW50ZW50X2lkIjoiaW50X2hBS2Jzcll6cXlMaHBlZm56Mm5WSllxR0hBIn0.QsRF3rWi8tTQzlF0AIg1t3gLzBFrLfT1cwAh6tTsA9k';
const intentid = 'int_hAKbsrYzqyLhpefnz2nVJYqGHA';

console.log(loadAirwallex);
loadAirwallex({
  env: 'staging', // 'staging' | 'demo' | 'prod'
  origin: window.location.origin
}).then(() => {
  const card = createElement('fullFeaturedCard', {
    intent: {
      id: intentid,
      client_secret: client_secret
    },
    component: 'default',
    autoCapture: false,
    withBilling: true
  });
  card.mount('fullFeaturedCard');

  // window.addEventListener('onSuccess', (event) => {
  //   console.log(JSON.stringify(event));
  // });
})

export default {
  name: 'Card',
  data () {
    return {
      msg: 'Airwallex checkout integration',
      desc: 'Option #3: Card integration'
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

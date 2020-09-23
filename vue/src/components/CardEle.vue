<template>
  <div class="cardEle">
    <h1>{{msg}}</h1>
    <!-- HPP -->
    <h2>{{desc}}</h2>
    <label>
      Card number
      <div id='cardNumber'></div>
    </label>
    <label>
      Expiry
      <div id='expiry'></div>
    </label>
    <label>
      CVC
      <div id='cvc'></div>
    </label>
    <button id='cardele' @click="triggerConfirm()">Confirm</button>
  </div>
</template>

<script>
import { createElement, confirmPaymentIntent, loadAirwallex } from 'airwallex-payment-elements';

const client_secret = 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDA4NDA1NzcsImV4cCI6MTYwMDg0NDE3NywiYWNjb3VudF9pZCI6IjM0OWZhYWQ5LTYzZGEtNDg3MS05YTVhLWIyYTIxNjViNTNiNiIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IlVLIiwiaW50ZW50X2lkIjoiaW50X21OT25FM3Y3ejRBeDM1VWNTekQ2eTRrQkU3ZSJ9.L3u_MDUGMlPZBsf37xowSve_lCJaFhI5-h1ee5iDAP8';
const intentid = 'int_mNOnE3v7z4Ax35UcSzD6y4kBE7e';
let cardNo;
let cardCvc;
let cardExpiry;

console.log(loadAirwallex);
loadAirwallex({
  env: 'staging', // 'staging' | 'demo' | 'prod'
  origin: window.location.origin
}).then(() => {
  cardNo = createElement('cardNumber');
  cardNo.mount('cardNumber');
  cardCvc = createElement('cvc');
  cardCvc.mount('cvc');
  cardExpiry = createElement('expiry');
  cardExpiry.mount('expiry');
})

const triggerConfirm = async () => {
  try {
    const confirmResult = await confirmPaymentIntent({
      element: cardNo,
      id: intentid,
      client_secret: client_secret,
      payment_method_options: {
        card: {
          auto_capture: true
        }
      }
    });
    console.log(confirmResult);
    const {id, status} = confirmResult || {};
    console.log('confirm success, id' + id + ', status:' + status);
  } catch (err) {
    console.log(err); //{code: "onError", type: "cardNumber", error: "GUEST_CONFIRM_FAILED"}
    // const {reason} = err;
    // const {code: {code}, error: {error}} = reason || {};
    // console.log(code);
  }
}

export default {
  name: 'CardEle',
  data () {
    return {
      msg: 'Airwallex checkout integration',
      desc: 'Option #4: Card elements integration',
      triggerConfirm
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

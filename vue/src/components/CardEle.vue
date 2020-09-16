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

const client_secret = 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTk0ODU5NTcsImV4cCI6MTU5OTQ4OTU1NywiYWNjb3VudF9pZCI6IjM0OWZhYWQ5LTYzZGEtNDg3MS05YTVhLWIyYTIxNjViNTNiNiIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IlVLIiwiaW50ZW50X2lkIjoiaW50X21UY0hROXRuemd0c3llRDVWemptVk12RlgzQyJ9.BY2ZUasLMCsP7ZzOGSU0y6-D-D8ZL_QQ-QwgQ426Iew';
const intentid = 'int_mTcHQ9tnzgtsyeD5VzjmVMvFX3C';
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
    await confirmPaymentIntent({
      element: cardNo,
      id: intentid,
      client_secret: client_secret,
      payment_method_options: {
        card: {
          auto_capture: true
        }
      }
    });
    const {confirmResult} = res || {};
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

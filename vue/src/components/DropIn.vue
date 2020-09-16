<template>
  <div class="dropIn">
    <h1>{{msg}}</h1>
    <!-- HPP -->
    <h2>{{desc}}</h2>
    <div id='dropIn'></div>
  </div>
</template>

<script>
import {createElement, loadAirwallex} from 'airwallex-payment-elements';

const client_secret = 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTk0NzA5MTksImV4cCI6MTU5OTQ3NDUxOSwiYWNjb3VudF9pZCI6IjM0OWZhYWQ5LTYzZGEtNDg3MS05YTVhLWIyYTIxNjViNTNiNiIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IlVLIiwiaW50ZW50X2lkIjoiaW50X3RSY283REtmejVWM1Foa2lhejNtRU5EdXQydSJ9.sISlwcZn0iEoF7PqH6o_onxxlmB15QzhnRJfhG0Tl8Y';
const intentid = 'int_tRco7DKfz5V3Qhkiaz3mENDut2u';

console.log(loadAirwallex);
loadAirwallex({
  env: 'staging', // 'staging' | 'demo' | 'prod'
  origin: window.location.origin
}).then(() =>{
    console.log(Airwallex);
    const dropIn = createElement('dropIn', {
      intent: {
        id: intentid,
        client_secret: client_secret
      },
      component: 'default',
      autoCapture: true,
      withBilling: true
    });
    dropIn.mount('dropIn');

    // window.addEventListener('onSuccess', (event) => {
    //   alert(JSON.stringify(event));
    // });
  }
)

export default {
  name: 'DropIn',
  data () {
    return {
      msg: 'Airwallex checkout integration',
      desc: 'Option #2: DropIn integration'
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

<template>
  <div>
    <h2>Option #2: DropIn integration</h2>
    <div id="dropIn" />
  </div>
</template>

<script>
import { createElement, loadAirwallex } from 'airwallex-payment-elements';

const intentid = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

loadAirwallex({
  env: 'staging',
  origin: window.location.origin,
}).then(() => {
  const dropIn = createElement('dropIn', {
    intent: {
      id: intentid,
      client_secret,
    },
  });
  dropIn.mount('dropIn');
});

window.addEventListener('onSuccess', (event) => {
  /*
      ... Handle event
    */
  console.log(JSON.stringify(event.detail));
});

export default {
  name: 'DropIn',
};
</script>

<style>
#dropIn {
  width: 540px;
  margin: 48px auto;
}
</style>

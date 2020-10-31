<template>
  <div>
    <h2>Option #5: Wechat element integration</h2>
    <div id="wechat" />
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
  const wechat = createElement('wechat', {
    intent: {
      id: intentid,
      client_secret,
    },
  });
  wechat.mount('wechat');

  window.addEventListener('onSuccess', (event) => {
    /*
      ... Handle event
    */
    console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
  });
});

export default {
  name: 'Wechat',
};
</script>

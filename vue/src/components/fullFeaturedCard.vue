<template>
  <div>
    <h2>Option #3: Full Featured Card integration</h2>
    <div id="fullFeaturedCard" />
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
  const card = createElement('fullFeaturedCard', {
    intent: {
      id: intentid,
      client_secret,
    },
  });
  card.mount('fullFeaturedCard');
});

window.addEventListener('onSuccess', (event) => {
  /*
    ... Handle event
  */
  console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
});

export default {
  name: 'FullFeaturedCard',
};
</script>

<style>
#fullFeaturedCard {
  width: 540px;
  margin: 48px auto;
}
</style>

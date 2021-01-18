<template>
  <div>
    <h2>Option #2: DropIn integration</h2>
    <!-- STEP 1: Add an empty container for the drop-in element to be placed into -->
    <div id="dropIn" />
  </div>
</template>

<script>
import { createElement, loadAirwallex } from 'airwallex-payment-elements';

const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

// STEP 2: Initialize Airwallex on mount with the appropriate production environment and other configurations
loadAirwallex({
  env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
  origin: window.location.origin, // Setup your event target to receive the browser events message
  fonts: [
    // Customizes the font for the payment elements
    {
      src: 'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',
      family: 'AxLLCircular',
      weight: 400,
    },
  ],
}).then(() => {
  // STEP 3: Create the drop-in element
  const dropIn = createElement('dropIn', {
    intent: {
      // Must provide intent details to prepare DropIn element
      id: intent_id,
      client_secret,
    },
  });
  // STEP 3: Mount the drop-in element to the empty container created previously
  dropIn.mount('dropIn');
});

window.addEventListener('onSuccess', (event) => {
  /*
    ... Handle event on success
  */
  console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
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

<!--
  dropIn.vue
  Airwallex Payment Demo - Vue.  Created by Jessica Zhou and Josie Ku.

  airwallex-payment-elements dropIn element integration in Vue.
  Comments with "Example" demonstrate how states can be integrated
  with the element, they can be removed.

  Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/dropin.md
-->
<template>
  <div>
    <h2>DropIn integration</h2>
    <!-- Example below: loading state when element is not yet mounted -->
    <p id="loading">
      Loading...
    </p>
    <!-- 
      STEP #3: Add an empty container for the dropIn element to be injected into 
      - Ensure this is the only element in your document with this id, otherwise the element may fail to mount.
    -->
    <div id="dropIn" :style="{ display: 'none' }" />
  </div>
</template>

<script>
// STEP #1: Import airwallex-payment-elements package
import { createElement, loadAirwallex } from 'airwallex-payment-elements';

// Enter your Payment Intent secret keys here
// More on getting these secrets: https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro
const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

const init = () => {
  // STEP #2: Initialize Airwallex on mount with the appropriate production environment and other configurations
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
    // For more detailed documentation at https://github.com/airwallex/airwallex-payment-demo/tree/master/docs#loadAirwallex
  }).then(() => {
    // STEP #4: Create the drop-in element
    const element = createElement('dropIn', {
      intent: {
        // Required, must provide intent details to prepare DropIn element for checkout
        id: intent_id,
        client_secret,
      },
    });
    // STEP #5: Mount the drop-in element to the empty container created previously
    element.mount('dropIn'); // This 'dropIn' id MUST MATCH the id on your empty container created in Step 3
  });
};

// STEP #6: Add an event listener to handle events when the element is mounted
const onReady = (event) => {
  /**
   * ... Handle event on element mount
   */
  document.getElementById('loading').style.display = 'none'; // Example: hide loading state when element is mounted
  document.getElementById('dropIn').style.display = 'block'; // Example: show element when mounted
  console.log(`Element is mounted: ${JSON.stringify(event.detail)}`);
};

// STEP #7: Add an event listener to handle events when the payment is successful.
const onSuccess = (event) => {
  /**
   * ... Handle events on success
   */
  window.alert(`Confirm success with ${JSON.stringify(event.detail)}`);
};

// STEP #8: Add an event listener to handle events when the payment has failed.
const onError = (event) => {
  /**
   * ... Handle event on error
   */
  console.log('There was an error', event.detail.error);
};

export default {
  name: 'DropIn',
  mounted() {
    init();
    window.addEventListener('onReady', onReady);
    window.addEventListener('onSuccess', onSuccess);
    window.addEventListener('onError', onError);
  },
  beforeDestroy() {
    // Be sure to clean up event listeners when component unmounts
    window.removeEventListener('onReady', onReady);
    window.removeEventListener('onSuccess', onSuccess);
    window.removeEventListener('onError', onError);
  },
};
</script>

<style>
/* Custom styling for the element */
#dropIn {
  width: 540px;
  margin: 48px auto;
}
</style>

<!--
  redirect.vue
  Airwallex Payment Demo - Vue.  Created by Chao Ding and Josie Ku.

  airwallex-payment-elements Redirect element integration in Vue.
  Comments with "Example" demonstrate how states can be integrated
  with the element, they can be removed.

  Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/redirect.md
-->
<template>
  <div>
    <h2>Redirect Element Integration</h2>
    <!-- Example below: show loading state when element is not ready -->
    <p id="loading">Loading...</p>
    <!-- Example: response message container -->
    <p id="error" style="display: none" />
    <!-- 
      STEP #3: Add an empty container for the redirect element to be injected into 
      - Ensure this is the only element in your document with this id, otherwise the element may fail to mount.
    -->
    <div id="redirect" :style="{ display: 'none' }" />
  </div>
</template>

<script>
// STEP #1: Import airwallex-payment-elements package
import { createElement, loadAirwallex } from 'airwallex-payment-elements';

// Enter your Payment Intent secret keys here
// More on getting these secrets: https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro
const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

// Enter your Payment Method here, this is used to redirect the customer to the appropriate payment method
// Methods: 'alipaycn', 'alipayhk'
const redirect_method = 'replace-with-your-redirect-method';

const init = () => {
  // STEP #2: Initialize Airwallex on mount with the appropriate production environment and other configurations
  loadAirwallex({
    env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
    origin: window.location.origin, // Setup your event target to receive the browser events message
  })
    .then(() => {
      // STEP #4: Create the redirect card element
      const redirect = createElement('redirect', {
        intent: {
          // Required, must provide intent details to prepare redirect element for checkout
          id: intent_id,
          client_secret,
        },
        method: redirect_method, // Required, must provide payment method type
      });
      // STEP #5: Mount the element to the empty container created previously
      redirect.mount('redirect'); // This 'redirect' id MUST MATCH the id on your empty container created in Step 3
    })
    .catch((error) => {
      document.getElementById('error').style.display = 'block'; // Example: show error block
      document.getElementById('error').innerHTML = error.message; // Example: set error message
      console.error('There was an error', event.detail.error);
    });
};

// STEP #6: Add an event listener to handle events when the element is mounted
const onReady = (event) => {
  /**
   * ... Handle event on element mount
   */
  document.getElementById('loading').style.display = 'none'; // Example: hide loading state when element is mounted
  document.getElementById('redirect').style.display = 'block'; // Example: show element when mounted
  console.log(`Element ready, ${JSON.stringify(event.detail)}`);
};

// STEP #7: Add an event listener to handle events when the payment procedure has failed
const onError = (event) => {
  /**
   * ... Handle event on error
   */
  const { error } = event.detail;
  document.getElementById('error').style.display = 'block'; // Example: show error block
  document.getElementById('error').innerHTML = error.message; // Example: set error message
  console.error('There was an error', event.detail.error);
};

export default {
  name: 'Redirect',
  mounted() {
    init();
    const domElement = document.getElementById('redirect');
    domElement.addEventListener('onReady', onReady);
    domElement.addEventListener('onError', onError);
  },
  beforeDestroy() {
    const domElement = document.getElementById('redirect');
    // Be sure to clean up event listeners when component unmounts
    if (domElement) {
      domElement.removeEventListener('onReady', onReady);
      domElement.removeEventListener('onError', onError);
    }
  },
};
</script>

<style>
/* Custom styling for the element */
#redirect {
  width: 540px;
  margin: 48px auto;
}
</style>

<!--
  card.vue
  Airwallex Payment Demo - Vue.  Created by Chao Ding and Josie Ku.

  airwallex-payment-elements Card element integration in Vue.
  Comments with "Example" demonstrate how states can be integrated
  with the element, they can be removed.

  Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/card.md
-->
<template>
  <div>
    <h2>Card Element Integration</h2>
    <!-- Example below: show loading state when element is not ready -->
    <p id="loading">
      Loading...
    </p>
    <!-- Example: response message container -->
    <p id="error" style="display:none" />
    <!-- 
      STEP #3: Add an empty container for the card element to be injected into 
      - Ensure this is the only element in your document with this id, otherwise the element may fail to mount.
    -->
    <div id="field-container" :style="{ display: 'none' }">
      <div id="card" />
      <button id="submit" :disabled="true" @click="triggerConfirm()">
        Confirm
      </button>
    </div>
  </div>
</template>

<script>
// STEP #1: Import airwallex-payment-elements package
import { createElement, loadAirwallex, getElement, confirmPaymentIntent } from 'airwallex-payment-elements';

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
    // STEP #4: Create the card element
    const card = createElement('card');
    // STEP #5: Mount the card element to the empty container created previously
    card.mount('card'); // This 'card' id MUST MATCH the id on your empty container created in Step 3
  });
};

// STEP #7: Add an event listener to handle events when the element is mounted
const onReady = (event) => {
  /**
   * ... Handle event on element mount
   */
  document.getElementById('loading').style.display = 'none'; // Example: hide loading state when element is mounted
  document.getElementById('field-container').style.display = 'block'; // Example: show element when mounted
  console.log(`Element ready, ${JSON.stringify(event.detail)}`);
};

// STEP #8: Add an event listener to handle events when the payment procedure has failed
const onError = (event) => {
  /**
   * ... Handle event on error
   */
  const { error } = event.detail;
  document.getElementById('error').style.display = 'block'; // Example: show error
  document.getElementById('error').innerHTML = error.message; // Example: set error message
  console.error('There was an error', error);
};

// STEP #9: Add an event listener to listen to the changes in the input element
const onChange = (event) => {
  const { complete } = event.detail;
  document.getElementById('submit').disabled = !complete; // Example: disable the button when the element is incomplete
};

// STEP #6a: Add a button handler to trigger the payment request
const triggerConfirm = () => {
  document.getElementById('submit').disabled = true; // Example: disable button while submitting
  document.getElementById('submit').innerHTML = 'Submitting...'; // Example: change button text while submitting

  const card = getElement('card');
  confirmPaymentIntent({
    element: card,
    id: intent_id,
    client_secret,
  })
    // STEP #6b: Listen to the request success response
    .then((response) => {
      /**
       * ...Handle confirm response
       */
      document.getElementById('submit').disabled = false; // Example: sets loading state
      document.getElementById('submit').innerHTML = 'Confirm'; // Example: reset button text
      window.alert(`Payment Intent confirmation was successful: ${JSON.stringify(response)}`);
    })
    // STEP #6c: Listen to the request failure response
    .catch((error) => {
      /**
       * ... Handle error response
       */
      document.getElementById('error').style.display = 'block'; // Example: show error message
      document.getElementById('error').innerHTML = response.message; // Example: fill in error message
      document.getElementById('submit').innerHTML = 'Confirm'; // Example: reset button state
      document.getElementById('submit').disabled = false; // Example: reset button state
      console.error(`There was an error, ${JSON.stringify(response)}`);
    });
};

export default {
  name: 'Card',
  data() {
    return {
      triggerConfirm,
    };
  },
  mounted() {
    init();
    window.addEventListener('onReady', onReady);
    window.addEventListener('onError', onError);
    window.addEventListener('onChange', onChange);
  },
  beforeDestroy() {
    // Be sure to clean up event listeners when component unmounts
    window.removeEventListener('onReady', onReady);
    window.removeEventListener('onError', onError);
    window.removeEventListener('onChange', onChange);
  },
};
</script>

<style>
#field-container {
  margin: 0 auto 16px;
  width: 300px;
}

/* Custom styling for the input */
#card {
  border: 1px solid;
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 8px;
  height: 28px;
}
</style>

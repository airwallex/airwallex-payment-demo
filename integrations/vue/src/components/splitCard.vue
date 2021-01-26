<!--
  splitCard.vue
  Airwallex Payment Demo - Vue.  Created by Chao Ding and Josie Ku.

  airwallex-payment-elements Split Card element integration in Vue.
  Comments with "Example" demonstrate how states can be integrated
  with the element, they can be removed.

  Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/splitcard.md
-->
<template>
  <div>
    <h2>Split Card element integration</h2>
    <!-- Styling example below: show loading state when element is not ready -->
    <p id="loading">
      Loading...
    </p>
    <!-- Example: response message container -->
    <p id="error" style="display:none" />
    <div id="card-container" :style="{ display: 'none' }">
      <!-- 
        STEP #3a: Add empty containers for the split elements to be injected into 
        - Ensure these are the only elements in your document with these id, otherwise the elements may fail to mount.
      -->
      <div class="field-container">
        <div class="field-label">
          Card number
        </div>
        <div id="cardNumber" />
      </div>
      <div class="field-container">
        <div class="field-label">
          Expiry
        </div>
        <div id="expiry" />
      </div>
      <div class="field-container">
        <div class="field-label">
          Cvc
        </div>
        <div id="cvc" />
      </div>
      <!-- STEP #3b: Add a submit button to trigger the payment request -->
      <button id="confirm" :disabled="true" @click="triggerConfirm()">
        Confirm
      </button>
    </div>
  </div>
</template>

<script>
// STEP #1: Import airwallex-payment-elements package
import { createElement, confirmPaymentIntent, loadAirwallex, getElement } from 'airwallex-payment-elements';

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
    // STEP #4: Create and mount the individual card elements
    const cardNumEle = createElement('cardNumber');
    const cvcEle = createElement('cvc');
    const expiryEle = createElement('expiry');

    // STEP #5: Mount split card elements
    cardNumEle.mount('cardNumber'); // This 'cardNumber' id MUST MATCH the id on your cardNumber empty container created in Step 3
    cvcEle.mount('cvc'); // Same as above
    expiryEle.mount('expiry'); // Same as above
  });
};

// Set up local variable to check all elements are mounted
const elementsReady = {
  cardNumber: false,
  expiry: false,
  cvc: false,
};

// STEP #7: Add an event handler to ensure the element is mounted
const onReady = (event) => {
  const { type } = event.detail;
  if (elementsReady.hasOwnProperty(type)) {
    elementsReady[type] = true; // Set element ready state
  }

  if (!Object.values(elementsReady).includes(false)) {
    document.getElementById('loading').style.display = 'none'; // Example: hide loading state when element is mounted
    document.getElementById('card-container').style.display = 'block'; // Example: show element when mounted
  }
};

// Set up local variable to validate element inputs
const elementsCompleted = {
  cardNumber: false,
  expiry: false,
  cvc: false,
};

// STEP #8: Add an event listener to listen to the changes in each of the input fields
const onChange = (event) => {
  const { type, complete } = event.detail;
  if (elementsCompleted.hasOwnProperty(type)) {
    elementsCompleted[type] = complete; // Set element completion state
  }

  // Check if all elements are completed, and set submit button disabled state
  const allElementsCompleted = !Object.values(elementsCompleted).includes(false);
  document.getElementById('confirm').disabled = !allElementsCompleted;
};

// STEP #9: Add an event listener to handle events when there is an error
const onError = (event) => {
  /*
    ... Handle event on error
  */
  const { error } = event.detail;
  document.getElementById('error').style.display = 'block'; // Example: show error block
  document.getElementById('error').innerHTML = error.message; // Example: set error message
  console.log('There was an error', event.detail.error);
};

// STEP #6a: Add a button handler to trigger the payment request
const triggerConfirm = async () => {
  const cardNumElement = getElement('cardNumber');
  confirmPaymentIntent({
    element: cardNumElement, // Only need to submit CardNumber element
    id: intent_id,
    client_secret,
    // Add other payment confirmation details, see docs here: https://github.com/airwallex/airwallex-payment-demo/tree/master/docs
    payment_method_options: {
      card: {
        auto_capture: true,
      },
    },
  })
    // STEP #6b: Listen to the request response
    .then((response) => {
      /**
       * ... Handle event on success
       */
      window.alert(`Confirm success with ${JSON.stringify(response)}`);
    })
    // STEP #6c: Listen to errors
    .catch((error) => {
      /**
       * ... Handle event on error
       */
      document.getElementById('error').style.display = 'block'; // Example: show error block
      document.getElementById('error').innerHTML = error.message; // Example: set error message
      console.error('There was an error', error);
    });
};

export default {
  name: 'CardEle',
  data() {
    return {
      triggerConfirm,
    };
  },
  mounted() {
    init();
    window.addEventListener('onReady', onReady);
    window.addEventListener('onChange', onChange);
    window.addEventListener('onError', onError);
  },
  beforeDestroy() {
    // Be sure to clean up event listeners when component unmounts
    window.removeEventListener('onReady', onReady);
    window.removeEventListener('onChange', onChange);
    window.removeEventListener('onError', onError);
  },
};
</script>

<style>
.field-container {
  margin: 0 auto 16px;
  width: 300px;
}
.field-container div {
  border: 1px solid;
  padding: 4px 8px;
  margin-top: 8px;
}
div.field-label {
  text-align: left;
  border: 0;
}

/* Custom styling for the inputs */
#cardNumber,
#cvc,
#expiry {
  border: 1px solid;
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 8px;
  height: 28px;
}
</style>

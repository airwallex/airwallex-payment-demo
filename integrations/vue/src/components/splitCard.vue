<template>
  <div>
    <h2>Option #4: Split Card element integration</h2>
    <!-- STEP 1a: Add empty containers for the card elements to be placed into -->
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
    <!-- STEP 1b: Add an button that will trigger a payment confirmation -->
    <button @click="triggerConfirm()">
      Confirm
    </button>
  </div>
</template>

<script>
import { createElement, confirmPaymentIntent, loadAirwallex, getElement } from 'airwallex-payment-elements';

const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

// STEP 2: Initialize Airwallex on mount with the appropriate production environment and other configurations
loadAirwallex({
  env: 'demo',
  origin: window.location.origin,
  fonts: [
    // Customizes the font for the payment elements
    {
      src: 'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',
      family: 'AxLLCircular',
      weight: 400,
    },
  ],
}).then(() => {
  // STEP 3: Create and mount the individual card elements
  const cardNumEle = createElement('cardNumber');
  cardNumEle.mount('cardNumber');
  const cvcEle = createElement('cvc');
  cvcEle.mount('cvc');
  const expiryEle = createElement('expiry');
  expiryEle.mount('expiry');
});

window.addEventListener('onReady', (event) => {
  /*
    ... Handle event when elements are ready
  */
  console.log(`Elements ready with ${JSON.stringify(event.detail)}`);
});

// STEP 4: Confirm payment intent with id and client_secret
const triggerConfirm = async () => {
  try {
    const cardNumEle = getElement('cardNumber');
    const confirmResult = await confirmPaymentIntent({
      element: cardNumEle,
      id: intent_id,
      client_secret,
      payment_method_options: {
        card: {
          auto_capture: true,
        },
      },
    });
    /*
      ... Handle event on success
    */
    window.alert(`Confirm success with ${JSON.stringify(confirmResult)}`);
  } catch (err) {
    /*
      ... Handle event on error
    */
    window.alert(`Confirm fail with ${JSON.stringify(err)}`);
  }
};

export default {
  name: 'CardEle',
  data() {
    return {
      triggerConfirm,
    };
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
</style>
<template>
  <div>
    <h2>Option #1: Hosted payment page (HPP) integration</h2>
    <!-- STEP 1: Create a button to redirect customer to Airwallex for payment processing -->
    <button @click="redirectHpp()">
      Redirect to HPP
    </button>
  </div>
</template>

<script>
import { redirectToCheckout, loadAirwallex } from 'airwallex-payment-elements';

const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

// STEP 2: Initialize Airwallex on click with appropriate production environment and other configurations
loadAirwallex({
  env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
});

// STEP 3: Redirect the customer to Airwallex checkout
const redirectHpp = async () => {
  try {
    await redirectToCheckout({
      env: 'demo',
      id: intent_id,
      client_secret: client_secret,
      theme: {
        fonts: [
          // Customizes the font for the payment elements
          {
            src: 'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',
            family: 'AxLLCircular',
            weight: 400,
          },
        ],
      },
    });
  } catch (error) {
    /*
      ... Handle event on error
       */
    window.alert('There was an error with HPP redirection', error);
  }
};

export default {
  name: 'Hpp',
  data() {
    return {
      redirectHpp,
    };
  },
};
</script>

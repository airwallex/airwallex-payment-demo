<template>
  <div>
    <h2>Option #1: Hosted payment page (HPP) integration</h2>
    <button @click="redirectHpp()">
      Redirect to HPP
    </button>
  </div>
</template>

<script>
import { redirectToCheckout, loadAirwallex } from 'airwallex-payment-elements';

const intentid = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

loadAirwallex({
  env: 'demo',
});

const redirectHpp = async () => {
  await redirectToCheckout({
    env: 'demo',
    id: intentid,
    client_secret: client_secret,
  });
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

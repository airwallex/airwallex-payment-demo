<template>
  <div>
    <h2>Option #5: Wechat Element Integration</h2>
    <!-- STEP 1: Add an empty container for the wechat element to be placed into -->
    <div id="wechat" />
  </div>
</template>

<script>
import { createElement, loadAirwallex } from 'airwallex-payment-elements';

// const intent_id = 'replace-with-your-intent-id';
// const client_secret = 'replace-with-your-client-secret';
const intent_id = 'int_6FCFmYc6z5XALntrCzqhgF1yhFU';
const client_secret =
  'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTA5NjMzNDIsImV4cCI6MTYxMDk2Njk0MiwiYWNjb3VudF9pZCI6ImZmMjI1YzEzLWQ5ODEtNDU2Yy1iZjk3LWYzODIxYzg1YTEyMiIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IkhLIiwiaW50ZW50X2lkIjoiaW50XzZGQ0ZtWWM2ejVYQUxudHJDenFoZ0YxeWhGVSJ9.JP6aZyoipwEjAsMxwYb8-0N-pmTmA1WovABOrJ5FzVA';

// STEP 2: Initialize Airwallex on mount with the appropriate production environment and other configurations
loadAirwallex({
  env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
  origin: window.location.origin, // Setup your event target to receive the browser events message
}).then(() => {
  // STEP 3: Create the wechat card element
  const wechat = createElement('wechat', {
    intent: {
      id: intent_id,
      client_secret,
    },
  });
  // STEP 4: Mount the element to the empty container created previously
  wechat.mount('wechat');

  window.addEventListener('onSuccess', (event) => {
    /*
      ... Handle event on success
    */
    console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
  });
});

export default {
  name: 'Wechat',
};
</script>

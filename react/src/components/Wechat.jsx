import React from 'react';
import { loadAirwallex, createElement } from 'airwallex-payment-elements';

const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

const Wechat = () => {
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

  return (
    <div>
      <h2>Option #5: Wechat element integration</h2>
      {/* STEP 1: Add an empty container for the wechat element to be placed into */}
      <div id="wechat"></div>
    </div>
  );
};

export default Wechat;

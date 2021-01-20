import React, { useEffect } from 'react';
// STEP 1: At the start of your file, import airwallex-payment-elements package
import { createElement, loadAirwallex } from 'airwallex-payment-elements';

const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

const Card = () => {
  useEffect(() => {
    // STEP 2: Initialize Airwallex with the appropriate Airwallex environment and other configurations
    loadAirwallex({
      env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
      origin: window.location.origin, // Setup your event target to receive the browser events message
      fonts: [
        // Can customize the font for the payment elements
        {
          src:
            'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',
          family: 'AxLLCircular',
          weight: 400,
        },
      ],
      // For more detailed documentation at
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

    const onSuccess = (event) => {
      /*
        ... Handle events on success
      */
      console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
    };

    window.addEventListener('onSuccess', onSuccess);
    return () => {
      window.removeEventListener('onSuccess', onSuccess);
    };
  }, []);
  return (
    <div>
      <h2>Option #2: Drop-In integration</h2>
      {/* STEP 1: Add an empty container for the drop-in element to be placed into */}
      <div id="dropIn"></div>
    </div>
  );
};

export default Card;

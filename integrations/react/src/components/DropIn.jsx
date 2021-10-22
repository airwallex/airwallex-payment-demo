/**
 * Dropin.jsx
 * Airwallex Payment Demo - React.  Created by Roy Yang and Josie Ku.
 *
 * airwallex-payment-elements Dropin element integration in React.js
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/dropin.md
 */

import React, { useEffect, useState } from 'react';
// STEP #1: At the start of your file, import airwallex-payment-elements package
import { createElement, loadAirwallex } from 'airwallex-payment-elements';

// Enter your Payment Intent secret keys here
// More on getting these secrets: https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro
const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';
const currency = 'replace-with-your-intent-currency';

const DropIn = () => {
  const [elementShow, setElementShow] = useState(false); // Example, set element show state
  const [errorMessage, setErrorMessage] = useState(false); // Example: set error state

  useEffect(() => {
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
      const dropIn = createElement('dropIn', {
        // Required, dropIn use intent Id, client_secret and currency to prepare checkout
        intent_id,
        client_secret,
        currency,
      });
      // STEP #5: Mount the drop-in element to the empty container created previously
      dropIn.mount('dropIn'); // This 'dropIn' id MUST MATCH the id on your empty container created in Step 3
    });

    // STEP ##6: Add an event listener to handle events when the element is mounted
    const onReady = (event) => {
      /**
       * ... Handle event on element mount
       */
      setElementShow(true);
      console.log(`Element is mounted: ${JSON.stringify(event)}`);
    };

    // STEP ##7: Add an event listener to handle events when the payment is successful.
    const onSuccess = (event) => {
      /**
       * ... Handle events on success
       */
      window.alert(`Confirm success with ${JSON.stringify(event.detail)}`);
    };

    // STEP ##8: Add an event listener to handle events when the payment has failed.
    const onError = (event) => {
      /**
       * ... Handle event on error
       */
      const { error } = event.detail;
      setErrorMessage(error.message);
      console.error('There was an error', error);
    };

    window.addEventListener('onReady', onReady);
    window.addEventListener('onSuccess', onSuccess);
    window.addEventListener('onError', onError);
    return () => {
      window.removeEventListener('onReady', onReady);
      window.removeEventListener('onSuccess', onSuccess);
      window.removeEventListener('onError', onError);
    };
  }, []); // This effect should ONLY RUN ONCE as we do not want to reload Airwallex and remount the elements

  // Example: Custom styling for the wechat container, can be placed in css
  const containerStyle = {
    width: '540px',
    margin: '48px auto',
  };

  return (
    <div>
      <h2>Drop-In integration</h2>
      {/* Example below: show loading state */}
      {!elementShow && <p>Loading...</p>}
      {/* Example below: display response message block */}
      {errorMessage.length > 0 && <p id="error">{errorMessage}</p>}
      {/**
       * STEP #3a: Add an empty container for the dropin element to be placed into
       * - Ensure this is the only element in your document with this id,
       *   otherwise the element may fail to mount.
       */}
      <div
        id="dropIn"
        style={{
          ...containerStyle, // Example: container styling can be moved to css
          display: elementShow ? 'block' : 'none', // Example: only show element when mounted
        }}
      />
    </div>
  );
};

export default DropIn;

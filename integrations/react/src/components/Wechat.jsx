/**
 * Wechat.jsx
 * Airwallex Payment Demo - React.  Created by Roy Yang and Josie Ku.
 *
 * airwallex-payment-elements Wechat element integration in React.js
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/wechat.md
 */
import React, { useEffect, useState } from 'react';
// STEP 1: At the start of your file, import airwallex-payment-elements package
import { loadAirwallex, createElement } from 'airwallex-payment-elements';

// Enter your Payment Intent secret keys here
// More on getting these secrets: https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro
const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

const Wechat = () => {
  const [elementShow, setElementShow] = useState(false); // Example: set loading state for element

  useEffect(() => {
    // STEP 2: Initialize Airwallex on mount with the appropriate production environment and other configurations
    loadAirwallex({
      env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
      origin: window.location.origin, // Setup your event target to receive the browser events message
    }).then(() => {
      // STEP 4: Create the wechat card element
      const wechat = createElement('wechat', {
        intent: {
          // Required, must provide intent details to prepare wechat element for checkout
          id: intent_id,
          client_secret,
        },
      });
      // STEP 5: Mount the element to the empty container created previously
      wechat.mount('wechat'); // This 'wechat' id MUST MATCH the id on your empty container created in Step 3
    });

    // STEP 6: Add an event listener to handle events when the element is mounted
    const onReady = (event) => {
      /**
       * ... Handle event on element mount
       */
      setElementShow(true);
      console.log(`Element ready, ${JSON.stringify(event.detail)}`);
    };

    // STEP 7: Add an event listener to handle events when the payment is successful
    const onSuccess = (event) => {
      /**
       * ... Handle event on success
       */
      console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
    };

    // STEP 8: Add an event listener to handle events when the payment procedure has failed
    const onError = (event) => {
      /**
       * ... Handle event on error
       */
      console.log(`Confirm error with ${JSON.stringify(event.detail)}`);
    };

    window.addEventListener('onReady', onReady);
    window.addEventListener('onSuccess', onSuccess);
    window.addEventListener('onError', onError);
    return () => {
      window.removeEventListener('onReady', onReady);
      window.removeEventListener('onSuccess', onSuccess);
      window.removeEventListener('onError', onError);
    };
  }, []);

  return (
    <div>
      <h2>Wechat element integration</h2>
      {/**
       * STEP 3: Add an empty container for the wechat element to be placed into
       * - Ensure this is the only element in your document with this id,
       *   otherwise the element may fail to mount.
       */}
      <div
        id="wechat"
        style={{ display: elementShow ? 'block' : 'none' }} // Example: only show element when mounted
      ></div>
      {
        !elementShow ? 'Loading...' : null // Example: show loading state when element is not ready
      }
    </div>
  );
};

export default Wechat;

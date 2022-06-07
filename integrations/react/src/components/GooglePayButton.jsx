/**
 * ApplePayButton.jsx
 * Airwallex Payment Demo - React.  Created by Josie Ku.
 *
 * airwallex-payment-elements google pay button element integration in React.js
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/applepaybutton.md
 */

import React, { useEffect, useState } from 'react';
// STEP #1: At the start of your file, import airwallex-payment-elements package
import { createElement, loadAirwallex } from 'airwallex-payment-elements';

// More on getting these secrets: https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro

const ApplePayButton = () => {
  const [elementShow, setElementShow] = useState(false); // Example: show element state
  const [errorMessage, setErrorMessage] = useState(false); // Example: set error state
  useEffect(() => {
    // STEP #2: Initialize Airwallex with the appropriate Airwallex environment and other configurations
    loadAirwallex({
      env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
      origin: window.location.origin, // Setup your event target to receive the browser events message
      fonts: [
        // Can customize the font for the payment elements
        {
          src: 'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',
          family: 'AxLLCircular',
          weight: 400,
        },
      ],
      // For more detailed documentation at https://github.com/airwallex/airwallex-payment-demo/tree/master/docs
    }).then(() => {
      // STEP #4: Create the google pay button element
      const applePayElement = createElement('googlePayButton', {
        mode: 'payment', // 'payment' or 'recurring'
        intent_id: 'replace with intent id',
        origin: window.location.origin,
        client_secret: 'replace with client_secret',
        countryCode: 'HK',
        amount: {
          value: 1,
          currency: 'HKD',
        },
        customer_id: 'replace with customer id',
        style: {
          popupWidth: 400,
          popupHeight: 549,
        },
      });
      // STEP #5: Mount the google pay button element to the empty container created previously
      applePayElement.mount('googlePayButton'); // This 'google pay button' id MUST MATCH the id on your empty container created in Step 3
    });

    // STEP #7: Add an event listener to ensure the element is mounted
    const onReady = (event) => {
      /**
       * ...Handle events on element ready
       */
      setElementShow(true); // Example: sets show once mounted
      console.log(`The Google Pay Button element is ready, ${JSON.stringify(event.detail)}`);
    };

    // STEP #8: Add an event listener to respond to errors
    const onError = (event) => {
      /**
       * ... Handle events on error
       */
      const { error } = event.detail;
      setErrorMessage(error.message);
      console.error('There was an error', error);
    };

    const onSuccess = (event) => {
      console.log(event);
    };

    window.addEventListener('onReady', onReady);
    window.addEventListener('onError', onError);
    window.addEventListener('onSuccess', onSuccess);
    return () => {
      window.removeEventListener('onReady', onReady);
      window.removeEventListener('onError', onError);
      window.removeEventListener('onSuccess', onSuccess);
    };
  }, []); // This effect should ONLY RUN ONCE as we do not want to reload Airwallex and remount the elements

  return (
    <div>
      <h2>Google Pay Button integration</h2>
      {/* Example below: show loading state */}
      {!elementShow && <p>Loading...</p>}
      {/* Example below: display response message block */}
      {errorMessage.length > 0 && <p id="error">{errorMessage}</p>}
      <div
        className="field-container"
        style={{ display: elementShow ? 'block' : 'none' }} // Example: Custom styling to only show google pay button when it is mounted
      >
        {/**
         * STEP #3a: Add an empty container for the google pay button element to be placed into
         * - Ensure this is the only element in your document with this id,
         *   otherwise the element may fail to mount.
         */}
        <div id="googlePayButton" />
      </div>
    </div>
  );
};

export default ApplePayButton;

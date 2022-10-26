/**
 * ApplePayButton.jsx
 * Airwallex Payment Demo - React.  Created by Josie Ku.
 *
 * airwallex-payment-elements apple pay button element integration in React.js
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
      // STEP #4: Create the apple pay button element
      const applePayElement = createElement('applePayButton', {
        mode: 'payment', // 'payment' or 'recurring'
        intent_id: 'replace with intent id',
        origin: window.location.origin,
        client_secret: 'replace with intent id',
        countryCode: 'HK',
        amount: {
          value: 1,
          currency: 'HKD',
        },
        customer_id: 'replace with customer id',
        requiredBillingContactFields: ['postalAddress', 'name', 'phoneticName'],
      });
      // STEP #5: Mount the apple pay button element to the empty container created previously
      applePayElement.mount('applePayButton'); // This 'apple pay button' id MUST MATCH the id on your empty container created in Step 3
    });

    // STEP #7: Add an event listener to ensure the element is mounted
    const onReady = (event) => {
      /**
       * ...Handle events on element ready
       */
      setElementShow(true); // Example: sets show once mounted
      console.log(`The Apple Pay Button element is ready, ${JSON.stringify(event.detail)}`);
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
    const domElement = document.getElementById('applePayButton');
    domElement.addEventListener('onReady', onReady);
    domElement.addEventListener('onError', onError);
    domElement.addEventListener('onSuccess', onSuccess);
    return () => {
      domElement.removeEventListener('onReady', onReady);
      domElement.removeEventListener('onError', onError);
      domElement.removeEventListener('onSuccess', onSuccess);
    };
  }, []); // This effect should ONLY RUN ONCE as we do not want to reload Airwallex and remount the elements

  useEffect(() => {
    if (
      document.getElementById('applePayButton')?.childNodes[0]?.contentWindow?.location?.href === 'about:blank' &&
      elementShow
    ) {
      setErrorMessage('Apple pay only support safari browser');
    }
  }, [elementShow, setErrorMessage]);

  return (
    <div>
      <h2>Apple Pay Button integration</h2>
      {/* Example below: show loading state */}
      {!elementShow && <p>Loading...</p>}
      {/* Example below: display response message block */}
      {errorMessage.length > 0 && <p id="error">{errorMessage}</p>}
      <div
        className="field-container"
        style={{ display: elementShow ? 'block' : 'none' }} // Example: Custom styling to only show apple pay button when it is mounted
      >
        {/**
         * STEP #3a: Add an empty container for the apple pay button element to be placed into
         * - Ensure this is the only element in your document with this id,
         *   otherwise the element may fail to mount.
         */}
        <div id="applePayButton" />
      </div>
    </div>
  );
};

export default ApplePayButton;

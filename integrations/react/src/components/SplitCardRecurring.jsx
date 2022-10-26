/**
 * SplitCardRecurring.jsx
 * Airwallex Payment Demo - React.  Created by Chao Ding.
 *
 * airwallex-payment-elements Split Card element recurring integration in React.js
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/splitcard.md
 */

import React, { useEffect, useState } from 'react';
// STEP #1: At the start of your file, import airwallex-payment-elements package
import { createElement, loadAirwallex, getElement, createPaymentConsent } from 'airwallex-payment-elements';

// Enter your Payment Intent secret keys here
// More on getting these secrets: https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro
const intent_id = 'replace-with-your-intent-id'; // or null
const client_secret = 'replace-with-your-client-secret';
const customer_id = 'replace-with-your-customer-id';
const currency = 'replace-with-your-currency';
const env = 'demo';
const next_triggered_by = 'merchant';

const Index = () => {
  // Example: element ready states, controls the display for when elements are successfully mounted
  const [cardNumberReady, setCardNumberReady] = useState(false);
  const [cvcReady, setCvcReady] = useState(false);
  const [expiryReady, setExpiryReady] = useState(false);
  // Example: element validation state, checks if each field is completed by the shopper
  const [cardNumberComplete, setCardNumberComplete] = useState(false);
  const [cvcComplete, setCvcComplete] = useState(false);
  const [expiryComplete, setExpiryComplete] = useState(false);
  // Example: controls submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Example: set error state
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    // STEP #2: Initialize Airwallex on mount with the appropriate production environment and other configurations
    loadAirwallex({
      env, // Can choose other production environments, 'staging | 'demo' | 'prod'
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
      // STEP #4: Create and mount the individual card elements
      const cardNumEle = createElement('cardNumber');
      const cvcEle = createElement('cvc');
      const expiryEle = createElement('expiry');

      // STEP #5: Mount split card elements
      cardNumEle.mount('cardNumber'); // This 'cardNumber' id MUST MATCH the id on your cardNumber empty container created in Step 3
      cvcEle.mount('cvc'); // Same as above
      expiryEle.mount('expiry'); // Same as above
    });

    // STEP #7: Add an event handler to ensure the element is mounted
    const onReady = (event) => {
      const { type } = event.detail;
      if (type === 'cardNumber') {
        setCardNumberReady(true);
      }
      if (type === 'cvc') {
        setCvcReady(true);
      }
      if (type === 'expiry') {
        setExpiryReady(true);
      }
    };

    // STEP #8: Add an event listener to listen to the changes in each of the input fields
    const onChange = (event) => {
      const { type, complete } = event.detail;
      if (type === 'cardNumber') {
        setCardNumberComplete(complete);
      }
      if (type === 'cvc') {
        setCvcComplete(complete);
      }
      if (type === 'expiry') {
        setExpiryComplete(complete);
      }
    };
    const domElement = document.getElementById('cardNumber');

    domElement.addEventListener('onReady', onReady);
    domElement.addEventListener('onChange', onChange); // Can also use onBlur

    return () => {
      domElement.removeEventListener('onReady', onReady);
      domElement.removeEventListener('onChange', onChange);
    };
  }, []); // This effect should ONLY RUN ONCE as we do not want to reload Airwallex and remount the elements

  // STEP #6a: Add a button handler to trigger the payment request
  const handleConfirm = async () => {
    setIsSubmitting(true); // Example: set loading state
    setErrorMessage(''); // Example: reset error message
    const cardNumElement = getElement('cardNumber');

    const payload = {
      customer_id,
      client_secret,
      currency,
      element: cardNumElement,
      next_triggered_by,
    };

    if (intent_id) {
      payload['intent_id'] = intent_id;
    }

    createPaymentConsent(payload)
      // STEP #6b: Listen to the request response
      .then((response) => {
        /**
         * ... Handle event on success
         */
        setIsSubmitting(false); // Example: reset loading state
        window.alert(`Confirm success with ${JSON.stringify(response)}`);
      })
      // STEP #6c: Listen to errors
      .catch((error) => {
        /**
         * ... Handle event on error
         */
        setIsSubmitting(false); // Example: reset loading state
        setErrorMessage(error.message ?? JSON.stringify(error)); // Example: set error message
        console.error('There was an error', error);
      });
  };

  // Example: combine all element ready states
  const allElementsReady = cardNumberReady && cvcReady && expiryReady;
  // Example: combine all element complete states
  const allElementsComplete = cardNumberComplete && cvcComplete && expiryComplete;

  // Example: Custom styling for the inputs, can be placed in css
  const inputStyle = {
    border: '1px solid',
    borderRadius: '5px',
    padding: '5px 10px',
    marginTop: '8px',
    height: '28px',
  };

  return (
    <div>
      <h2>Split Card Element Recurring integration</h2>
      {/* Example: set loading state before elements are ready */}
      {!allElementsReady && <p>Loading...</p>}
      {/* Example below: display response message block */}
      {errorMessage.length > 0 && <p id="error">{errorMessage}</p>}
      {/* Styling example above: only displays block when all elements are ready */}
      <div style={{ display: allElementsReady ? 'block' : 'none' }}>
        {/* STEP #3a: Add empty containers for the card elements to be placed into */}
        <div className="field-container">
          <div className="field-label">Card number</div>
          <div
            id="cardNumber"
            style={inputStyle} // Example: input styling can be moved to css
          />
        </div>
        <div className="field-container">
          <div className="field-label">Expiry</div>
          <div
            id="expiry"
            style={inputStyle} // Example: input styling can be moved to css
          />
        </div>
        <div className="field-container">
          <div className="field-label">Cvc</div>
          <div
            id="cvc"
            style={inputStyle} // Example: input styling can be moved to css
          />
        </div>
        {/* STEP #3b: Add a submit button to trigger the payment request */}
        <button
          onClick={handleConfirm}
          disabled={!allElementsComplete || isSubmitting} // Prevents invalid submissions
        >
          {isSubmitting ? 'Loading' : 'Confirm'}
        </button>
      </div>
    </div>
  );
};

export default Index;

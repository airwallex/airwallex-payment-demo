/**
 * SplitCard.jsx
 * Airwallex Payment Demo - React.  Created by Roy Yang and Josie Ku.
 *
 * airwallex-payment-elements Split Card element integration in React.js
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/splitcard.md
 */

import React, { useEffect, useState } from 'react';
// STEP #1: At the start of your file, import airwallex-payment-elements package
import { createElement, loadAirwallex, getElement, confirmPaymentIntent } from 'airwallex-payment-elements';

// Enter your Payment Intent secret keys here
// More on getting these secrets: https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro
const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

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

  const [inputErrorMessage, setInputErrorMessage] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
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
    // STEP #9: Add an event listener to get input focus status
    const onFocus = (event) => {
      const { type } = event.detail;
      setInputErrorMessage((errorMessage) => ({
        ...errorMessage,
        [type]: '', // Example: clear input error message
      }));
      // Customize your input focus style by listen onFocus event
    };
    // STEP #10: Add an event listener to show input error message when finish typing
    const onBlur = (event) => {
      const { type, error } = event.detail;
      setInputErrorMessage((errorMessage) => ({
        ...errorMessage,
        [type]: error?.message ?? JSON.stringify(error),
      }));
    };

    window.addEventListener('onReady', onReady);
    window.addEventListener('onChange', onChange); // Can also use onBlur
    window.addEventListener('onBlur', onBlur);
    window.addEventListener('onFocus', onFocus);

    return () => {
      window.removeEventListener('onReady', onReady);
      window.removeEventListener('onChange', onChange);
      window.removeEventListener('onBlur', onBlur);
      window.removeEventListener('onFocus', onFocus);
    };
    // This effect should ONLY RUN ONCE as we do not want to reload Airwallex and remount the elements
  }, []);

  // STEP #6a: Add a button handler to trigger the payment request
  const handleConfirm = async () => {
    setIsSubmitting(true); // Example: set loading state
    setErrorMessage(''); // Example: reset error message
    const cardNumElement = getElement('cardNumber');
    confirmPaymentIntent({
      element: cardNumElement, // Only need to submit CardNumber element
      id: intent_id,
      client_secret,
      // Add other payment confirmation details, see docs here: https://github.com/airwallex/airwallex-payment-demo/tree/master/docs
      payment_method_options: {
        card: {
          auto_capture: true,
        },
      },
    })
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
      <h2>Split Card element integration</h2>
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
          <p style={{ color: 'red' }}>{inputErrorMessage.cardNumber}</p>
        </div>
        <div className="field-container">
          <div className="field-label">Expiry</div>
          <div
            id="expiry"
            style={inputStyle} // Example: input styling can be moved to css
          />
          <p style={{ color: 'red' }}>{inputErrorMessage.expiry}</p>
        </div>
        <div className="field-container">
          <div className="field-label">Cvc</div>
          <div
            id="cvc"
            style={inputStyle} // Example: input styling can be moved to css
          />
          <p style={{ color: 'red' }}>{inputErrorMessage.cvc}</p>
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

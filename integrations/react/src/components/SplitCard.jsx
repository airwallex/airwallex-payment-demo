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
import {
  createElement,
  loadAirwallex,
  getElement,
  confirmPaymentIntent,
} from 'airwallex-payment-elements';

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

  useEffect(() => {
    // STEP #2: Initialize Airwallex on mount with the appropriate production environment and other configurations
    loadAirwallex({
      env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
      origin: window.location.origin, // Setup your event target to receive the browser events message
      fonts: [
        // Customizes the font for the payment elements
        {
          src:
            'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',
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

    window.addEventListener('onReady', onReady);
    window.addEventListener('onChange', onChange); // Can also use onBlur

    return () => {
      window.removeEventListener('onReady', onReady);
      window.removeEventListener('onChange', onChange);
    };
  }, []); // This effect should ONLY RUN ONCE as we do not want to reload Airwallex and remount the elements

  // STEP #6a: Add a button handler to trigger the payment request
  const handleConfirm = async () => {
    setIsSubmitting(true);
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
        setIsSubmitting(false);
        window.alert(`Confirm success with ${JSON.stringify(response)}`);
      })
      // STEP #6c: Listen to errors
      .catch((response) => {
        /**
         * ... Handle event on error
         */
        setIsSubmitting(false);
        window.alert(`Confirm fail with ${JSON.stringify(response)}`);
      });
  };

  const allElementsReady = cardNumberReady && cvcReady && expiryReady;
  const allElementsComplete =
    cardNumberComplete && cvcComplete && expiryComplete;

  const inputStyle = {
    // Custom styling for the inputs, can be placed in css
    border: '1px solid',
    borderRadius: '5px',
    padding: '5px 10px',
    marginTop: '8px',
    height: '28px',
  };

  return (
    <div>
      <h2>Split Card element integration</h2>
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
      {
        !allElementsReady ? 'Loading...' : null // Example: set loading state before elements are ready
      }
    </div>
  );
};

export default Index;

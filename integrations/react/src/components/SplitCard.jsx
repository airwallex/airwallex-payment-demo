import React, { useEffect, useState } from 'react';
import {
  createElement,
  loadAirwallex,
  getElement,
  confirmPaymentIntent,
} from 'airwallex-payment-elements';

const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

const Index = () => {
  const [cardNumberComplete, setCardNumberComplete] = useState(false);
  const [cvcComplete, setCvcComplete] = useState(false);
  const [expiryComplete, setExpiryComplete] = useState(false);
  useEffect(() => {
    // STEP 2: Initialize Airwallex on mount with the appropriate production environment and other configurations
    loadAirwallex({
      env: 'demo',
      origin: window.location.origin,
      fonts: [
        // Customizes the font for the payment elements
        {
          src:
            'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',
          family: 'AxLLCircular',
          weight: 400,
        },
      ],
    }).then(() => {
      // STEP 3: Create and mount the individual card elements
      const cardNumEle = createElement('cardNumber');
      cardNumEle.mount('cardNumber');
      const cvcEle = createElement('cvc');
      cvcEle.mount('cvc');
      const expiryEle = createElement('expiry');
      expiryEle.mount('expiry');
    });

    // An event handler for when an element is mounted
    const onReady = (event) => {
      console.log(`Elements ready with ${JSON.stringify(event.detail)}`);
    };

    // Handler to detect input change for each element
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
    window.addEventListener('onChange', onChange); // Can also using onBlur

    return () => {
      window.removeEventListener('onReady', onReady);
      window.removeEventListener('onChange', onChange);
    };
  }, []);

  // STEP 4: Confirm payment intent with id and client_secret
  const handleConfirm = async () => {
    try {
      const cardNumElement = getElement('cardNumber');
      const confirmResult = await confirmPaymentIntent({
        element: cardNumElement,
        id: intent_id,
        client_secret,
        payment_method_options: {
          card: {
            auto_capture: true,
          },
        },
      });
      /*
      ... Handle event on success
       */
      window.alert(`Confirm success with ${JSON.stringify(confirmResult)}`);
    } catch (err) {
      /*
      ... Handle event on error
       */
      window.alert(`Confirm fail with ${JSON.stringify(err)}`);
    }
  };

  return (
    <div>
      <h2>Option #4: Split Card element integration</h2>
      {/* STEP 1a: Add empty containers for the card elements to be placed into */}
      <div className="field-container">
        <div className="field-label">Card number</div>
        <div id="cardNumber" />
      </div>
      <div className="field-container">
        <div className="field-label">Expiry</div>
        <div id="expiry" />
      </div>
      <div className="field-container">
        <div className="field-label">Cvc</div>
        <div id="cvc" />
      </div>
      {/* STEP 1b: Add an button that will trigger a payment confirmation */}
      <button
        onClick={handleConfirm}
        disabled={!cardNumberComplete || !cvcComplete || !expiryComplete}
      >
        Confirm
      </button>
    </div>
  );
};

export default Index;

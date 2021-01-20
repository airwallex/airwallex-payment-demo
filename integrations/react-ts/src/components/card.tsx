import React, { useEffect } from 'react';
import {
  createElement,
  loadAirwallex,
  getElement,
  confirmPaymentIntent,
  ElementType,
} from 'airwallex-payment-elements';

const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';
const ELEMENT_TYPE: ElementType = 'card';

const Index: React.FC = () => {
  useEffect(() => {
    // STEP 2: Initialize Airwallex on mount with the appropriate production environment and other configurations
    loadAirwallex({
      env: 'demo',
      origin: window.location.origin,
    }).then(() => {
      // STEP 3: Create and mount the individual card elements
      createElement(ELEMENT_TYPE)?.mount(ELEMENT_TYPE);
    });

    const onReady = (event: CustomEvent) => {
      /*
      ... Handle event when elements are mounted
      */
      console.log(`Elements ready with ${JSON.stringify(event.detail)}`);
    };

    window.addEventListener('onReady', onReady as EventListener);
    return () => {
      window.removeEventListener('onReady', onReady as EventListener);
    };
  });

  // STEP 4: Confirm payment intent with id and client_secret
  const triggerConfirm = async () => {
    try {
      const cardNumberElement = getElement('card');
      if (cardNumberElement) {
        const confirmResult = await confirmPaymentIntent({
          element: cardNumberElement,
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
        console.log(`Confirm success with ${JSON.stringify(confirmResult)}`);
      }
    } catch (err) {
      /*
      ... Handle event on error
       */
      console.log(`Confirm fail with ${JSON.stringify(err)}`);
    }
  };

  return (
    <div>
      <h2>Option #6: Card element integration</h2>
      {/* STEP 1a: Add an empty for the card element to be placed into */}
      <div className="field-container" id={ELEMENT_TYPE} />
      {/* STEP 1b: Add an button that will trigger a payment confirmation */}
      <button onClick={triggerConfirm}>Confirm</button>
    </div>
  );
};

export default Index;

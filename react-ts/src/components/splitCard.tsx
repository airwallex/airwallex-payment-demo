import React, { useEffect, useState } from 'react';
import {
  createElement,
  loadAirwallex,
  getElement,
  confirmPaymentIntent,
  EventDetail,
} from 'airwallex-payment-elements';

const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

const Index: React.FC = () => {
  const [cardNumberComplete, setCardNumberComplete] = useState<
    undefined | boolean
  >(false);
  const [cvcComplete, setCvcComplete] = useState<undefined | boolean>(false);
  const [expiryComplete, setExpiryComplete] = useState<undefined | boolean>(
    false,
  );
  useEffect(() => {
    // STEP 2: Initialize Airwallex on mount with the appropriate production environment and other configurations
    loadAirwallex({
      env: 'demo',
      origin: window.location.origin,
    }).then(() => {
      // STEP 3: Create and mount the individual card elements
      createElement('cardNumber')?.mount('card-number');
      createElement('cvc')?.mount('cvc');
      createElement('expiry')?.mount('expiry');
    });

    // An event handler for when an element is mounted
    const onReady = (event: Event) => {
      console.log(
        `Elements ready with ${JSON.stringify((event as CustomEvent)?.detail)}`,
      );
    };

    // Handler to detect input change for each element
    const onChange = (event: Event) => {
      const { type, complete } = (event as CustomEvent)?.detail as EventDetail;
      if (type === 'cardNumber') {
        setCardNumberComplete(complete);
      }
      if (type === 'cvc') {
        setCvcComplete(complete);
      }
      if (type === 'expiry') {
        setExpiryComplete(complete);
      }
      console.log(
        `Elements changed with ${JSON.stringify(
          (event as CustomEvent)?.detail,
        )}`,
      );
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
      const cardNumberElement = getElement('cardNumber');
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
        window.alert(`confirm success with ${JSON.stringify(confirmResult)}`);
      }
    } catch (err) {
      /*
      ... Handle event on error
       */
      window.alert(`confirm fail with ${JSON.stringify(err)}`);
    }
  };

  return (
    <div>
      <h2>Option #4: Split Card element integration</h2>
      {/* STEP 1a: Add empty containers for the card elements to be placed into */}
      <div className="field-container">
        <div className="label">Card number</div>
        <div id="card-number" />
      </div>
      <div className="field-container">
        <div className="label">Expiry</div>
        <div id="expiry" />
      </div>
      <div className="field-container">
        <div className="label">Cvc</div>
        <div id="cvc" />
      </div>
      {/* STEP 1b: Add a button to trigger payment confirmation */}
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

import React, { useEffect } from 'react';
import {
  createElement,
  loadAirwallex,
  getElement,
  confirmPaymentIntent,
  ElementType,
} from 'airwallex-payment-elements';

const intentId = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';
const ELEMENT_TYPE: ElementType = 'card';

const Index: React.FC = () => {
  useEffect(() => {
    loadAirwallex({
      env: 'demo',
      origin: window.location.origin,
    }).then(() => {
      createElement(ELEMENT_TYPE)?.mount(ELEMENT_TYPE);
    });

    const onReady = (event: CustomEvent) => {
      /*
      ... Handle event
    */
      console.log(`Elements ready with ${JSON.stringify(event.detail)}`);
    };

    window.addEventListener('onReady', onReady as EventListener);
    return () => {
      window.removeEventListener('onReady', onReady as EventListener);
    };
  });

  const triggerConfirm = async () => {
    try {
      const cardNumberElement = getElement('card');
      if (cardNumberElement) {
        const confirmResult = await confirmPaymentIntent({
          element: cardNumberElement,
          id: intentId,
          client_secret,
          payment_method_options: {
            card: {
              auto_capture: true,
            },
          },
        });
        console.log(`confirm success with ${JSON.stringify(confirmResult)}`);
      }
    } catch (err) {
      console.log(`confirm fail with ${JSON.stringify(err)}`);
    }
  };

  return (
    <div>
      <h2>Option #6: Card element integration</h2>
      <div id={ELEMENT_TYPE} />
      <button onClick={triggerConfirm} style={{ marginTop: '8px' }}>
        Confirm
      </button>
    </div>
  );
};

export default Index;

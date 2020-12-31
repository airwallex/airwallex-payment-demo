import { useEffect } from 'react';
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

export default function card() {
  useEffect(() => {
    loadAirwallex({
      env: 'staging',
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
      const cardNumberElement = getElement(ELEMENT_TYPE);
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
        console.log(`confirm success with ${JSON.stringify(confirmResult)}`);
      }
    } catch (err) {
      console.log(`confirm fail with ${JSON.stringify(err)}`);
    }
  };

  return (
    <div>
      <h2>Card element integration</h2>
      <div className="element" id={ELEMENT_TYPE} />
      <button onClick={triggerConfirm} style={{ marginTop: '8px' }}>
        Confirm
      </button>
    </div>
  );
}
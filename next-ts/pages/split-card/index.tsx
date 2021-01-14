import { useEffect } from 'react';
import {
  createElement,
  loadAirwallex,
  getElement,
  confirmPaymentIntent,
} from 'airwallex-payment-elements';

const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

export default function splitCard() {
  useEffect(() => {
    loadAirwallex({
      env: 'demo',
      origin: window.location.origin,
    }).then(() => {
      createElement('cardNumber')?.mount('card-number');
      createElement('cvc')?.mount('cvc');
      createElement('expiry')?.mount('expiry');
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
  const containerStyle = {
    border: '1px solid',
    padding: '4px 8px',
    marginBottom: '8px',
  };

  const triggerConfirm = async () => {
    try {
      const cardNumberElement = getElement('cardNumber');
      if (cardNumberElement) {
        const confirmResult = await confirmPaymentIntent({
          element: cardNumberElement,
          id: intent_id,
          client_secret: client_secret,
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
      <h2>Split Card element integration</h2>
      <div className="element">
        <div style={containerStyle}>
          <div>Card number</div>
          <div id="card-number" />
        </div>
        <div style={containerStyle}>
          <div>Expiry</div>
          <div id="expiry" />
        </div>
        <div style={containerStyle}>
          <div>Cvc</div>
          <div id="cvc" />
        </div>
        <button onClick={triggerConfirm}>Confirm</button>
      </div>
    </div>
  );
}

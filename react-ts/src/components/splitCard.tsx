import React, { useEffect, useState } from 'react';
import {
  createElement,
  loadAirwallex,
  getElement,
  confirmPaymentIntent,
  EventDetail,
} from 'airwallex-payment-elements';

const intentId = 'replace-with-your-intent-id';
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
    loadAirwallex({
      env: 'demo',
      origin: window.location.origin,
    }).then(() => {
      createElement('cardNumber')?.mount('card-number');
      createElement('cvc')?.mount('cvc');
      createElement('expiry')?.mount('expiry');
    });

    const onReady = (event: Event) => {
      console.log(
        `Elements ready with ${JSON.stringify((event as CustomEvent)?.detail)}`,
      );
    };

    window.addEventListener('onReady', onReady);
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
    window.addEventListener('onChange', onChange); // Can also using onBlur
    return () => {
      window.removeEventListener('onReady', onReady);
      window.removeEventListener('onChange', onChange);
    };
  }, []);
  const containerStyle = {
    border: '1px solid',
    padding: '4px 8px',
    marginBottom: '8px',
    width: '200px',
  };

  const handleConfirm = async () => {
    try {
      const cardNumberElement = getElement('cardNumber');
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
      <h2>Option #4: Split Card element integration</h2>
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

import React, { useEffect, useState } from 'react';
import {
  createElement,
  loadAirwallex,
  getElement,
  confirmPaymentIntent,
} from 'airwallex-payment-elements';

const intent_id = "replace-with-your-intent-id";
const client_secret = "replace-with-your-client-secret";

const Index = () => {
  const [cardNumberComplete, setCardNumberComplete] = useState(false);
  const [cvcComplete, setCvcComplete] = useState(false);
  const [expiryComplete, setExpiryComplete] = useState(false);
  useEffect(() => {
    loadAirwallex({
      env: 'demo',
      origin: window.location.origin,
    }).then(() => {
      const cardNumEle = createElement('cardNumber');
      cardNumEle.mount('cardNumber');
      const cvcEle = createElement('cvc');
      cvcEle.mount('cvc');
      const expiryEle = createElement('expiry');
      expiryEle.mount('expiry');
    });

    const onReady = (event) => {
      console.log(`Elements ready with ${JSON.stringify(event.detail)}`);
    };
    window.addEventListener('onReady', onReady);
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
      console.log(`Elements changed with ${JSON.stringify(event.detail)}`);
    }
    window.addEventListener('onChange', onChange); // Can also using onBlur
    return () => {
      window.removeEventListener('onReady', onReady);
      window.removeEventListener('onChange', onChange);
    };
  }, []);

  const handleConfirm = async () => {
    try {
      const cardNumEle = getElement('cardNumber');
      const confirmResult = await confirmPaymentIntent({
        element: cardNumEle,
        id: intent_id,
        client_secret,
        payment_method_options: {
          card: {
            auto_capture: true,
          },
        },
      });
      console.log(`confirm success with ${JSON.stringify(confirmResult)}`);
    } catch (err) {
      console.log(`confirm fail with ${JSON.stringify(err)}`);
    }
  };

  return (
    <div>
      <h2>Option #4: Split Card element integration</h2>
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
      <button onClick={handleConfirm} disabled={!cardNumberComplete || !cvcComplete || !expiryComplete}>Confirm</button>
    </div>
  );
};

export default Index;

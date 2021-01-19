import { useEffect, useState } from 'react';
import {
  createElement,
  loadAirwallex,
  getElement,
  confirmPaymentIntent,
  EventDetail,
} from 'airwallex-payment-elements';

// const intent_id = 'replace-with-your-intent-id';
// const client_secret = 'replace-with-your-client-secret';
const intent_id = 'int_d39jDcBwzndyDsBI5zPwvxLXeXS';
const client_secret =
  'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTEwNDM4MTQsImV4cCI6MTYxMTA0NzQxNCwiYWNjb3VudF9pZCI6ImZmMjI1YzEzLWQ5ODEtNDU2Yy1iZjk3LWYzODIxYzg1YTEyMiIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IkhLIiwiaW50ZW50X2lkIjoiaW50X2QzOWpEY0J3em5keURzQkk1elB3dnhMWGVYUyJ9.BQ7A0rr2Z22thv_vhiEYuUGFUn3HgT4H9d14RgEpViw';

export default function splitCard() {
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

    const onReady = (event: CustomEvent) => {
      /*
      ... Handle event when elements are mounted
      */
      console.log(`Elements ready with ${JSON.stringify(event.detail)}`);
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

    window.addEventListener('onReady', onReady as EventListener);
    window.addEventListener('onChange', onChange as EventListener); // Can also using onBlur
    return () => {
      window.removeEventListener('onReady', onReady as EventListener);
      window.removeEventListener('onChange', onChange as EventListener);
    };
  });
  const containerStyle = {
    border: '1px solid',
    padding: '4px 8px',
    marginBottom: '8px',
  };

  // STEP 4: Confirm payment intent with id and client_secret
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
      <h2>Split Card element integration</h2>
      {/* STEP 1: Add empty containers for the card elements to be placed into */}
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
        {/* STEP 1b: Add a button to trigger payment confirmation */}
        <button onClick={triggerConfirm}>Confirm</button>
      </div>
    </div>
  );
}

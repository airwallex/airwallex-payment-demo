import React, { useEffect } from 'react';
import { createElement, loadAirwallex } from 'airwallex-payment-elements';

const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

const DropIn = () => {
  useEffect(() => {
    loadAirwallex({
      env: 'demo',
      origin: window.location.origin,
    }).then(() => {
      const dropIn = createElement('dropIn', {
        intent: {
          id: intent_id,
          client_secret,
        },
      });
      dropIn.mount('dropIn');
    });

    const onSuccess = (event) => {
      /*
        ... Handle event
      */
      console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
    };

    window.addEventListener('onSuccess', onSuccess);
    return () => {
      window.removeEventListener('onSuccess', onSuccess);
    };
  }, []);
  return (
    <div>
      <h2>Option #2: DropIn integration</h2>
      <div id="dropIn"></div>
    </div>
  );
};

export default DropIn;

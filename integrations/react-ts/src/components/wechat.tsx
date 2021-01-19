import React, { useEffect } from 'react';
import {
  createElement,
  loadAirwallex,
  ElementType,
} from 'airwallex-payment-elements';

const intentId = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';
const ELEMENT_TYPE: ElementType = 'wechat';

const Index: React.FC = () => {
  useEffect(() => {
    loadAirwallex({
      env: 'demo',
    }).then(() => {
      createElement(ELEMENT_TYPE, {
        intent: {
          id: intentId,
          client_secret,
        },
        origin: window.location.origin,
      })?.mount(ELEMENT_TYPE);
    });
    const onSuccess = (event: CustomEvent) => {
      /*
        ... Handle event
      */
      console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
    };

    window.addEventListener('onSuccess', onSuccess as EventListener);
    return () => {
      window.removeEventListener('onSuccess', onSuccess as EventListener);
    };
  }, []);

  return (
    <div>
      <h2>Option #5: Wechat element integration</h2>
      <div id={ELEMENT_TYPE}></div>
    </div>
  );
};

export default Index;

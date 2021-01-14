import React, { useEffect } from 'react';
import {
  createElement,
  loadAirwallex,
  ElementType,
} from 'airwallex-payment-elements';

const intentId = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';
const ELEMENT_TYPE: ElementType = 'fullFeaturedCard';

const Index: React.FC = () => {
  useEffect(() => {
    loadAirwallex({
      env: 'demo',
      origin: window.location.origin,
    }).then(() => {
      createElement(ELEMENT_TYPE, {
        intent: {
          id: intentId,
          client_secret,
        },
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
      <h2>Option #3: FullFeaturedCard integration</h2>
      <div id={ELEMENT_TYPE}></div>
    </div>
  );
};

export default Index;

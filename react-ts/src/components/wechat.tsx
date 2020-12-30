import React, { useEffect } from 'react';
import {
  createElement,
  loadAirwallex,
  ElementType,
} from 'airwallex-payment-elements';

const intentId = 'int_7HUOnL6yztTB3H0LPzclsDYHrqW';
const client_secret =
  'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDkyMzY3NjIsImV4cCI6MTYwOTI0MDM2MiwiYWNjb3VudF9pZCI6IjZkMzljOGU3LWQyY2EtNGQ0Yy04N2I5LWIzY2Y3MzNkNTU2ZSIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IlVLIiwiaW50ZW50X2lkIjoiaW50XzdIVU9uTDZ5enRUQjNIMExQemNsc0RZSHJxVyJ9.MR7mK5vHgT_sckVAA0ejo2iZbHtlj1kUeDip4-nodAQ';
const ELEMENT_TYPE: ElementType = 'wechat';

const Index: React.FC = () => {
  useEffect(() => {
    loadAirwallex({
      env: 'staging',
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

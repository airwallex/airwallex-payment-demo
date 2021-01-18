import React, { useEffect } from 'react';
import {
  createElement,
  loadAirwallex,
  ElementType,
} from 'airwallex-payment-elements';

const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';
const ELEMENT_TYPE: ElementType = 'wechat';

const Index: React.FC = () => {
  useEffect(() => {
    // STEP 2: Initialize Airwallex on mount with the appropriate production environment and other configurations
    loadAirwallex({
      env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
      origin: window.location.origin, // Setup your event target to receive the browser events message
    }).then(() => {
      createElement(ELEMENT_TYPE, {
        intent: {
          id: intent_id,
          client_secret,
        },
        origin: window.location.origin,
      })?.mount(ELEMENT_TYPE);
    });
    const onSuccess = (event: CustomEvent) => {
      /*
        ... Handle event on success
      */
      window.alert(`Confirm success with ${JSON.stringify(event.detail)}`);
    };

    window.addEventListener('onSuccess', onSuccess as EventListener);
    return () => {
      window.removeEventListener('onSuccess', onSuccess as EventListener);
    };
  }, []);

  return (
    <div>
      <h2>Option #5: Wechat element integration</h2>
      {/* STEP 1: Add an empty container for the wechat element to be placed into */}
      <div id={ELEMENT_TYPE}></div>
    </div>
  );
};

export default Index;

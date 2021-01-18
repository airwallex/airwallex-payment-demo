import React, { useEffect } from 'react';
import {
  createElement,
  loadAirwallex,
  ElementType,
  PaymentMethodWithRedirect,
} from 'airwallex-payment-elements';

const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';
const redirectMethod = 'replace-with-your-redirect-method';
const ELEMENT_TYPE: ElementType = 'redirect';

const Index: React.FC = () => {
  useEffect(() => {
    // STEP 2: Initialize Airwallex on mount with the appropriate production environment and other configurations
    loadAirwallex({
      env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
      origin: window.location.origin, // Setup your event target to receive the browser events message
    }).then(() => {
      // STEP 3: Create and mount the wechat card element
      createElement(ELEMENT_TYPE, {
        intent: {
          id: intent_id,
          client_secret,
        },
        method: redirectMethod as PaymentMethodWithRedirect,
      })?.mount(ELEMENT_TYPE);
    });

    const onSuccess = (event: CustomEvent) => {
      /*
        ... Handle event on success
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
      <h2>Option #7: Redirect integration</h2>
      {/* STEP 1: Add an empty container for the redirect element to be placed into */}
      <div className="field-container" id={ELEMENT_TYPE}></div>
    </div>
  );
};

export default Index;

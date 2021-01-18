import React, { useEffect } from 'react';
import {
  createElement,
  loadAirwallex,
  ElementType,
} from 'airwallex-payment-elements';

const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';
const ELEMENT_TYPE: ElementType = 'fullFeaturedCard';

const Index: React.FC = () => {
  useEffect(() => {
    // STEP 2: Initialize Airwallex on mount with the appropriate production environment and other configurations
    loadAirwallex({
      env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
      origin: window.location.origin, // Setup your event target to receive the browser events message
    }).then(() => {
      // STEP 3: Create the full featured card element
      const element = createElement(ELEMENT_TYPE, {
        intent: {
          id: intent_id,
          client_secret,
        },
      });
      // STEP 4: Mount the element to the empty container created previously
      element?.mount(ELEMENT_TYPE);
    });
    const onSuccess = (event: CustomEvent) => {
      /*
        ... Handle event
      */
      console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
    };

    const onError = (event: CustomEvent) => {
      /*
        ... Handle event
      */
      console.log(`Confirm error with ${JSON.stringify(event.detail)}`);
    };

    window.addEventListener('onSuccess', onSuccess as EventListener);
    window.addEventListener('onError', onError as EventListener);
    return () => {
      window.removeEventListener('onSuccess', onSuccess as EventListener);
      window.removeEventListener('onError', onError as EventListener);
    };
  }, []);

  return (
    <div>
      <h2>Option #3: Full Featured Card integration</h2>
      {/* STEP 1: Add an empty container for the full featured card element to be placed into */}
      <div id={ELEMENT_TYPE}></div>
    </div>
  );
};

export default Index;

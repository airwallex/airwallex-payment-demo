import React, { useEffect } from 'react';
import { loadAirwallex, createElement } from 'airwallex-payment-elements';

const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

const FullFeaturedCard = () => {
  useEffect(() => {
    // STEP 2: Initialize Airwallex on mount with the appropriate production environment and other configurations
    loadAirwallex({
      env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
      origin: window.location.origin, // Setup your event target to receive the browser events message
    }).then(() => {
      // STEP 3: Create the full featured card element
      const fullFeaturedCard = createElement('fullFeaturedCard', {
        intent: {
          id: intent_id,
          client_secret,
        },
      });
      // STEP 4: Mount the element to the empty container created previously
      fullFeaturedCard.mount('fullFeaturedCard');
    });

    const onSuccess = (event) => {
      /*
      ... Handle event on success
      */
      console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
    };

    const onError = (event) => {
      /*
      ... Handle event on error
      */
      console.log(`Error with ${JSON.stringify(event.detail)}`);
    };

    window.addEventListener('onSuccess', onSuccess);
    window.addEventListener('onError', onError);
    return () => {
      window.removeEventListener('onSuccess', onSuccess);
      window.removeEventListener('onError', onError);
    };
  }, []);
  return (
    <div>
      <h2>Option #3: Full Featured Card integration</h2>
      {/* STEP 1: Add an empty container for the full featured card element to be placed into */}
      <div id="fullFeaturedCard"></div>
    </div>
  );
};

export default FullFeaturedCard;

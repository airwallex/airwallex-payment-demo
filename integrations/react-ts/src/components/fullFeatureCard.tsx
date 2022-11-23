/**
 * fullFeatureCard.tsx
 * Airwallex Payment Demo - React Typescript.
 *
 * airwallex-payment-elements FullFeaturedCard element integration in React Typescript
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/fullfeaturedcard.md
 */

import React, { useEffect, useState } from 'react';
// STEP #1: At the start of your file, import airwallex-payment-elements package
import { createElement, loadAirwallex } from 'airwallex-payment-elements';
import { v4 as uuid } from 'uuid';
import { createPaymentIntent } from '../util';

const Index: React.FC = () => {
  const [elementShow, setElementShow] = useState(false); // Example: set element show state

  useEffect(() => {
    const loadFullFeaturedCard = async () => {
      try {
        // STEP #2: Initialize Airwallex on mount with the appropriate production environment and other configurations
        await loadAirwallex({
          env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
          origin: window.location.origin, // Setup your event target to receive the browser events message
          // For more detailed documentation at https://github.com/airwallex/airwallex-payment-demo/tree/master/docs#loadAirwallex
        });
        // STEP #3: Create payment intent
        const intent = await createPaymentIntent({
          request_id: uuid(),
          merchant_order_id: uuid(),
          amount: 68 * 2,
          currency: 'USD',
          order: {
            products: [
              {
                url: 'https://staging-pacheckoutdemo.airwallex.com/assets/img/book1_detail.png',
                name: 'Lumario',
                desc: 'Example product',
                unit_price: 68,
                currency: 'USD',
                quantity: 2,
              },
            ],
          },
        });
        // STEP #4: Create the drop-in element
        const element = createElement('fullFeaturedCard', {
          intent,
        });
        // STEP #5: Mount the element to the empty container created previously
        element?.mount('fullFeaturedCard'); // This 'fullFeaturedCard' id MUST MATCH the id on your empty container created in Step 4
      } catch (error) {
        console.error(error);
      }
    };
    loadFullFeaturedCard();
    // STEP #6: Add an event listener to handle events when the element is mounted
    const onReady = (event: CustomEvent): void => {
      /**
       * Handle event on element mount
       */
      setElementShow(true);
      console.log(`Element is ready ${JSON.stringify(event.detail)}`);
    };

    // STEP #7: Add an event listener to handle events when the payment is successful
    const onSuccess = (event: CustomEvent): void => {
      /**
       * Handle event on success
       */
      console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
    };

    // STEP #8: Add an event listener to handle events when the payment has failed
    const onError = (event: CustomEvent) => {
      /**
       * Handle event on error
       */
      const { error } = event.detail;
      console.error('There is an error', error);
    };
    const domElement = document.getElementById('fullFeaturedCard');
    domElement?.addEventListener('onReady', onReady as EventListener);
    domElement?.addEventListener('onSuccess', onSuccess as EventListener);
    domElement?.addEventListener('onError', onError as EventListener);
    return () => {
      domElement?.removeEventListener('onReady', onReady as EventListener);
      domElement?.removeEventListener('onSuccess', onSuccess as EventListener);
      domElement?.removeEventListener('onError', onError as EventListener);
    };
  }, []);

  // Example: Custom styling for the wechat container, can be placed in css
  const containerStyle = {
    width: '540px',
    margin: '48px auto',
  };

  return (
    <div>
      {/* Example below: show loading state */}
      {!elementShow && <p>Loading...</p>}
      {/**
       * STEP #3: Add an empty container for the fullFeaturedCard element to be placed into
       * - Ensure this is the only element in your document with this id,
       *   otherwise the element may fail to mount.
       */}
      <div
        id="fullFeaturedCard"
        style={{
          ...containerStyle, // Example: container styling can be moved to css
          display: elementShow ? 'block' : 'none', // Example: only show element when mounted
        }}
      />
    </div>
  );
};

export default Index;

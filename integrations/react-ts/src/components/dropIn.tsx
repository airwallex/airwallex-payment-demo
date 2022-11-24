/**
 * dropIn.tsx
 * Airwallex Payment Demo - React Typescript.
 *
 * airwallex-payment-elements Dropin element integration in React Typescript
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/dropin.md
 */

import React, { useEffect } from 'react';
// STEP #1: At the start of your file, import airwallex-payment-elements package
import { createElement, loadAirwallex } from 'airwallex-payment-elements';
import { v4 as uuid } from 'uuid';
import { createPaymentIntent } from '../util';
import { useHistory } from 'react-router-dom';

const Index: React.FC = () => {
  const history = useHistory();
  useEffect(() => {
    const loadDropInElement = async () => {
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
                url: 'https://via.placeholder.com/503x570',
                name: 'Sample product',
                desc: 'Sample product',
                unit_price: 68,
                currency: 'USD',
                quantity: 2,
              },
            ],
          },
        });
        const { id, client_secret, currency } = intent;
        // STEP #4: Create the drop-in element
        const element = createElement('dropIn', {
          // Required, dropIn use intent Id, client_secret and currency to prepare checkout
          intent_id: id,
          client_secret,
          currency,
          style: {
            // the 3ds popup window dimension
            popupWidth: 400,
            popupHeight: 549,
          },
        });
        // STEP #5: Mount the drop-in element to the empty container created previously
        element?.mount('dropIn'); // This 'dropIn' id MUST MATCH the id on your empty container created in Step 4
      } catch (error) {
        console.error(error);
      }
    };
    loadDropInElement();
    // STEP #6: Add an event listener to handle events when the element is mounted
    const onReady = (event: CustomEvent): void => {
      /**
       * Handle events on element mount
       */
      console.log(`Element is mounted: ${JSON.stringify(event.detail)}`);
    };

    // STEP #7: Add an event listener to handle events when the payment is successful.
    const onSuccess = (event: CustomEvent): void => {
      /**
       * Handle events on success
       */
      console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
      history.push('/checkout-success');
    };

    // STEP #8: Add an event listener to handle events when the payment has failed.
    const onError = (event: CustomEvent) => {
      /**
       * Handle events on error
       */
      const { error } = event.detail;
      console.error('There is an error', error);
    };
    const domElement = document.getElementById('dropIn');
    domElement?.addEventListener('onReady', onReady as EventListener);
    domElement?.addEventListener('onSuccess', onSuccess as EventListener);
    domElement?.addEventListener('onError', onError as EventListener);
    return () => {
      domElement?.removeEventListener('onReady', onReady as EventListener);
      domElement?.removeEventListener('onSuccess', onSuccess as EventListener);
      domElement?.removeEventListener('onError', onError as EventListener);
    };
  }, [history]); // This effect should ONLY RUN ONCE as we do not want to reload Airwallex and remount the elements

  // Example: Custom styling for the dropIn container, can be placed in css
  const containerStyle = {
    width: '540px',
    margin: '48px auto',
  };

  return (
    <div>
      {/**
       * STEP #4a: Add an empty container for the dropin element to be placed into
       * - Ensure this is the only element in your document with this id,
       *   otherwise the element may fail to mount.
       */}
      <div
        id="dropIn"
        style={{
          ...containerStyle, // Example: container styling can be moved to css
        }}
      />
    </div>
  );
};

export default Index;

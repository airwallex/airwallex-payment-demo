/**
 * wechat.tsx
 * Airwallex Payment Demo - React Typescript.
 *
 * airwallex-payment-elements Wechat element integration in React Typescript
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/wechat.md
 */

import React, { useEffect, useState } from 'react';
// STEP #1: At the start of your file, import airwallex-payment-elements package
import { createElement, loadAirwallex, ElementType } from 'airwallex-payment-elements';
import { v4 as uuid } from 'uuid';
import { createPaymentIntent } from '../util';

const Index: React.FC = () => {
  const [elementShow, setElementShow] = useState(false); // Example: set loading state for element
  const [errorMessage, setErrorMessage] = useState(''); // Example: set error state

  useEffect(() => {
    const loadWeChat = async () => {
      // STEP #2: Initialize Airwallex on mount with the appropriate production environment and other configurations
      await loadAirwallex({
        env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
        origin: window.location.origin, // Setup your event target to receive the browser events message
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
      // STEP #4, 5: Create and mount the wechat element
      createElement('wechat' as ElementType, {
        intent,
        origin: window.location.origin,
      })?.mount('wechat'); // This 'wechat' id MUST MATCH the id on your empty container created in Step 3
    };
    loadWeChat();
    // STEP #6: Add an event listener to handle events when the element is mounted
    const onReady = (event: CustomEvent): void => {
      console.log('In the onReady event handler');
      /**
       * Handle event on element mount
       */
      setElementShow(true);
      console.log(`Element ready, ${JSON.stringify(event.detail)}`);
    };

    // STEP #7: Add an event listener to handle events when the payment is successful
    const onSuccess = (event: CustomEvent): void => {
      /**
       * ... Handle event on success
       */
      window.alert(`Confirm success with ${JSON.stringify(event.detail)}`);
    };

    // STEP #8: Add an event listener to handle events when the payment procedure has failed
    const onError = (event: CustomEvent): void => {
      /**
       * ... Handle event on error
       */
      const { error } = event.detail;
      setErrorMessage(error.message ?? JSON.stringify(error)); // Example: set error message
      console.error('There is an error', error);
    };
    const domElement = document.getElementById('wechat');
    domElement?.addEventListener('onReady', onReady as EventListener);
    domElement?.addEventListener('onSuccess', onSuccess as EventListener);
    domElement?.addEventListener('onError', onError as EventListener);

    return () => {
      domElement?.removeEventListener('onReady', onReady as EventListener);
      domElement?.removeEventListener('onSuccess', onSuccess as EventListener);
      domElement?.removeEventListener('onError', onError as EventListener);
    };
  }, []); // This effect should ONLY RUN ONCE as we do not want to reload Airwallex and remount the elements

  // Example: Custom styling for the wechat container, can be placed in css
  const containerStyle = {
    width: '540px',
    margin: '48px auto',
  };

  return (
    <div>
      {/* Example below: show loading state */}
      {!elementShow && <p>Loading...</p>}
      {/* Example below: display response message block */}
      {errorMessage.length > 0 && <p id="error">{errorMessage}</p>}
      {/**
       * STEP #3: Add an empty container for the wechat element to be placed into
       * - Ensure this is the only element in your document with this id,
       *   otherwise the element may fail to mount.
       */}
      <div
        id="wechat"
        style={{
          ...containerStyle, // Example: container styling can be moved to css
          display: elementShow ? 'block' : 'none', // Example: only show element when mounted
        }}
      ></div>
    </div>
  );
};

export default Index;

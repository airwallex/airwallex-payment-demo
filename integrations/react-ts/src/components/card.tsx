/**
 * card.tsx
 * Airwallex Payment Demo - React Typescript.  Created by Olivia Wei and Josie Ku.
 *
 * airwallex-payment-elements Card element integration in React Typescript
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/card.md
 */

import React, { useEffect, useRef, useState } from 'react';
// STEP #1: At the start of your file, import airwallex-payment-elements package
import { createElement, init } from '@airwallex/components-sdk';
import { v4 as uuid } from 'uuid';
import { createPaymentIntent } from '../util';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const [elementShow, setElementShow] = useState(false); // Example: show element state
  const [isSubmitting, setIsSubmitting] = useState(false); // Example: show submission processing state
  const [errorMessage, setErrorMessage] = useState(''); // Example: set error state
  const [inputErrorMessage, setInputErrorMessage] = useState(''); //  Example: set input error state
  const elementRef = useRef<any>(null);
  const navigate = useNavigate();

  async function initAirwallex() {
    // STEP #2: Initialize Airwallex on mount with the appropriate production environment and other configurations
    await init({
      env: 'demo',
      enabledElements: ['payments'],
    });
    // STEP #4, 5: Create and mount the card element
    const element = await createElement('card', {
      style: {
        popupWidth: 400,
        popupHeight: 549,
      },
    });
    elementRef.current = element;
    element?.mount('card');
    // STEP ##7: Add an event listener to ensure the element is mounted
    const onReady = (event: CustomEvent): void => {
      /**
       * ... Handle event when elements are mounted
       */
      setElementShow(true);
      console.log(`Elements ready with ${JSON.stringify(event.detail)}`);
    };

    // STEP ##8: Add an event listener to respond to errors
    const onError = (event: CustomEvent): void => {
      /**
       * ... Handle events on error
       */
      const { error } = event.detail;
      setIsSubmitting(false); // Example: set loading state
      setErrorMessage(error.message ?? JSON.stringify(error)); // Example: set error message
      console.error('There is an error', error);
    };
    // STEP #9: Add an event listener to get input focus status
    const onFocus = (): void => {
      setInputErrorMessage(''); // Example: clear input error message
      // Customize your input focus style by listen onFocus event
    };

    // STEP #10: Add an event listener to show input error message when finish typing
    const onBlur = (event: CustomEvent): void => {
      const { error } = event.detail;
      setInputErrorMessage(error?.message ?? JSON.stringify(error)); // Example: set input error message
    };
    const domElement = document.getElementById('card');
    domElement?.addEventListener('onReady', onReady as EventListener);
    domElement?.addEventListener('onError', onError as EventListener);
    domElement?.addEventListener('onFocus', onFocus as EventListener);
    domElement?.addEventListener('onBlur', onBlur as EventListener);
    return () => {
      domElement?.removeEventListener('onReady', onReady as EventListener);
      domElement?.removeEventListener('onError', onError as EventListener);
      domElement?.removeEventListener('onFocus', onFocus as EventListener);
      domElement?.removeEventListener('onBlur', onBlur as EventListener);
    };
  }

  useEffect(() => {
    initAirwallex();
  }, []); // This effect should ONLY RUN ONCE as we do not want to reload Airwallex and remount the elements

  // STEP ##6a: Add a button handler to trigger the payment request
  const triggerConfirm = async () => {
    setIsSubmitting(true); // Example: set loading state
    setErrorMessage(''); // Example: reset error message
    if (elementRef.current) {
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
      const { id, client_secret } = intent;
      elementRef.current
        .confirm({
          id,
          client_secret,
          // Add other payment confirmation details, see docs here: https://github.com/airwallex/airwallex-payment-demo/tree/master/docs
          payment_method_options: {
            card: {
              auto_capture: true,
            },
          },
        })
        // STEP ##6b: Listen to the request success response
        .then((response: any) => {
          /**
           * ...Handle confirm response
           */
          setIsSubmitting(false); // Example: sets loading state
          console.log(`Payment Intent confirmation was successful: ${JSON.stringify(response)}`);
          navigate('/checkout-success');
        })
        // STEP ##6c: Listen to the request failure response
        .catch((error: any) => {
          /**
           * ... Handle error response
           */
          setIsSubmitting(false); // Example: sets loading state
          setErrorMessage(error.message ?? JSON.stringify(error)); // Example: set error message
          console.error('There is an error', error);
        });
    }
  };

  // Example: Custom styling for the inputs, can be placed in css
  const inputStyle = {
    border: '1px solid',
    borderRadius: '5px',
    padding: '5px 10px',
    marginTop: '8px',
    height: '28px',
  };

  return (
    <div>
      {/* Example below: show loading state */}
      {!elementShow && <p>Loading...</p>}
      {/* Example below: display response message block */}
      {errorMessage.length > 0 && <p id="error">{errorMessage}</p>}
      <div
        className="field-container"
        style={{ display: elementShow ? 'block' : 'none' }} // Example: Custom styling to only show card when it is mounted
      >
        {/**
         * STEP #3a: Add an empty container for the card element to be placed into
         * - Ensure this is the only element in your document with this id,
         *   otherwise the element may fail to mount.
         */}
        <div
          id="card"
          style={inputStyle} // Example: input styling can be moved to css
        />
        <p style={{ color: 'red' }}>{inputErrorMessage}</p>
        {/* STEP ##3b: Add a submit button to trigger the payment request */}
        <button
          onClick={triggerConfirm}
          disabled={isSubmitting} // Example: disables button when submitting to prevent resubmission
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Index;

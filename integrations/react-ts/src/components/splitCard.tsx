/**
 * splitCard.tsx
 * Airwallex Payment Demo - React Typescript.  Created by Olivia Wei and Josie Ku.
 *
 * @airwallex/components-sdk Split Card element integration in React Typescript
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/splitcard.md
 */

import React, { useEffect, useRef, useState } from 'react';
// STEP #1: At the start of your file, import @airwallex/components-sdk package
import { init, createElement } from '@airwallex/components-sdk';
import { v4 as uuid } from 'uuid';
import { createPaymentIntent } from '../util';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  // Example: element ready states, controls the display for when elements are successfully mounted
  const [cardNumberReady, setCardNumberReady] = useState<boolean>(false);
  const [cvcReady, setCvcReady] = useState<boolean>(false);
  const [expiryReady, setExpiryReady] = useState<boolean>(false);
  // Example: element validation state, checks if each field is completed by the shopper
  const [cardNumberComplete, setCardNumberComplete] = useState<undefined | boolean>(false);
  const [cvcComplete, setCvcComplete] = useState<undefined | boolean>(false);
  const [expiryComplete, setExpiryComplete] = useState<undefined | boolean>(false);
  const [inputErrorMessage, setInputErrorMessage] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
  // Example: controls submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Example: set error state
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const CardNumberRef = useRef<any>(null);
  const CvcRef = useRef<any>(null);
  const ExpiryRef = useRef<any>(null);

  async function initAirwallex() {
    // STEP #2: Initialize Airwallex on mount with the appropriate production environment and other configurations
    await init({
      enabledElements: ['payments'],
      env: 'demo',
    });

    // STEP #4, 5: Create and mount the individual card elements
    const cardNumber = await createElement('cardNumber');
    const cvc = await createElement('cvc');
    const expiry = await createElement('expiry');
    cardNumber?.mount('cardNumber');
    cvc?.mount('cvc');
    expiry?.mount('expiry');
    CardNumberRef.current = cardNumber;
    CvcRef.current = cvc;
    ExpiryRef.current = expiry;
    // STEP #7: Add an event handler to ensure the element is mounted
    const onReady = (event: CustomEvent): void => {
      const { type } = event.detail;
      if (type === 'cardNumber') {
        setCardNumberReady(true);
      }
      if (type === 'cvc') {
        setCvcReady(true);
      }
      if (type === 'expiry') {
        setExpiryReady(true);
      }
    };

    // STEP #8: Add an event listener to listen to the changes in each of the input fields
    const onChange = (event: CustomEvent) => {
      const { type, complete } = event.detail;
      if (type === 'cardNumber') {
        setCardNumberComplete(complete);
      }
      if (type === 'cvc') {
        setCvcComplete(complete);
      }
      if (type === 'expiry') {
        setExpiryComplete(complete);
      }
      console.log(`Elements changed with ${JSON.stringify(event.detail)}`);
    };
    // STEP #9: Add an event listener to get input focus status
    const onFocus = (event: CustomEvent) => {
      const { type } = event.detail;
      setInputErrorMessage({
        ...inputErrorMessage,
        [type]: '', // Example: clear input error message
      });
      // Customize your input focus style by listen onFocus event
    };
    // STEP #10: Add an event listener to show input error message when finish typing
    const onBlur = (event: CustomEvent) => {
      const { type, error } = event.detail;
      setInputErrorMessage((prev) => ({
        ...prev,
        [type]: error?.message ?? JSON.stringify(error),
      }));
    };
    const cardNumberElement = document.getElementById('cardNumber');
    const expiryElement = document.getElementById('expiry');
    const cvcElement = document.getElementById('cvc');
    const domElementArray = [cardNumberElement, expiryElement, cvcElement];
    domElementArray.forEach((element) => {
      element?.addEventListener('onReady', onReady as EventListener);
      element?.addEventListener('onChange', onChange as EventListener);
      element?.addEventListener('onFocus', onFocus as EventListener);
      element?.addEventListener('onBlur', onBlur as EventListener);
    });
  }

  // This effect should ONLY RUN ONCE as we do not want to reload Airwallex and remount the elements
  useEffect(() => {
    initAirwallex();
  }, []);

  // STEP #6a: Add a button handler to trigger the payment request
  const handleConfirm = async () => {
    setIsSubmitting(true); // Example: set loading state
    setErrorMessage(''); // Example: reset error message
    if (CardNumberRef.current) {
      try {
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
        const { id, client_secret } = intent;
        const response = await CardNumberRef.current?.confirmPaymentIntent({
          id,
          client_secret,
          // Add other payment confirmation details, see docs here: https://github.com/airwallex/airwallex-payment-demo/tree/master/docs
          payment_method_options: {
            card: {
              auto_capture: true,
            },
          },
        });
        // STEP #6b: Listen to the request response
        setIsSubmitting(false); // Example: reset loading state
        console.log(`Confirm success with ${JSON.stringify(response)}`);
        navigate('/checkout-success');
      } catch (error) {
        // STEP #6c: Listen to error
        /**
         *  Handle event on error
         */
        setIsSubmitting(false); // Example: reset loading state
        setErrorMessage(JSON.stringify(error)); // Example: set error message
        console.error('There is an error', error);
      }
    }
  };

  // Example: combine all element ready states
  const allElementsReady = cardNumberReady && cvcReady && expiryReady;
  // Example: combine all element complete states
  const allElementsComplete = cardNumberComplete && cvcComplete && expiryComplete;

  // Example: Custom styling for the inputs, can be placed in css
  const inputStyle = {
    border: '1px solid',
    borderRadius: '5px',
    padding: '5px 10px',
    marginTop: '8px',
    height: '28px',
  };

  return (
    <div id="splitCard">
      {/* Example below: show loading state */}
      {!allElementsReady && <p>Loading...</p>}
      {/* Example below: display response message block */}
      {errorMessage.length > 0 && <p id="error">{errorMessage}</p>}
      {/* Styling example below: only displays block when all elements are ready */}
      <div style={{ display: allElementsReady ? 'block' : 'none' }}>
        {/* STEP #3a: Add empty containers for the card elements to be placed into */}
        <div className="field-container">
          <div className="field-label">Card number</div>
          <div
            id="cardNumber"
            style={inputStyle} // Example: input styling can be moved to css
          />
          <p style={{ color: 'red' }}>{inputErrorMessage.cardNumber}</p>
        </div>
        <div className="field-container">
          <div className="field-label">Expiry</div>
          <div
            id="expiry"
            style={inputStyle} // Example: input styling can be moved to css
          />
          <p style={{ color: 'red' }}>{inputErrorMessage.expiry}</p>
        </div>
        <div className="field-container">
          <div className="field-label">Cvc</div>
          <div
            id="cvc"
            style={inputStyle} // Example: input styling can be moved to css
          />
          <p style={{ color: 'red' }}>{inputErrorMessage.cvc}</p>
        </div>
        {/* STEP #3b: Add a submit button to trigger the payment request */}
        <button
          onClick={handleConfirm}
          disabled={!allElementsComplete || isSubmitting} // Prevents invalid submissions
        >
          {isSubmitting ? 'Loading' : 'Confirm'}
        </button>
      </div>
    </div>
  );
};

export default Index;

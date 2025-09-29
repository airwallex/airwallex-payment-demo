/**
 * splitCard.tsx
 * Airwallex Payment Demo - React Typescript.  Created by Olivia Wei and Josie Ku.
 *
 * airwallex-payment-elements Split Card element integration in React Typescript
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/splitcard.md
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
// STEP #1: At the start of your file, import airwallex-payment-elements package
import { init, createElement } from '@airwallex/components-sdk';
import { v4 as uuid } from 'uuid';
import { createPaymentIntent } from '../util';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  // Example: element ready states, controls the display for when elements are successfully mounted
  const [cardNumberReady, setCardNumberReady] = useState<boolean>(false);
  const [identifierReady, setIdentifierReady] = useState<boolean>(false);
  const [expiryReady, setExpiryReady] = useState<boolean>(false);
  const [pswFirst2Ready, setPswFirst2Ready] = useState<boolean>(false);

  // Example: element validation state, checks if each field is completed by the shopper
  const [cardNumberComplete, setCardNumberComplete] = useState<undefined | boolean>(false);
  const [identifierComplete, setIdentifierComplete] = useState<undefined | boolean>(false);
  const [expiryComplete, setExpiryComplete] = useState<undefined | boolean>(false);
  const [pswFirst2Complete, setPswFirst2Complete] = useState<undefined | boolean>(false);

  // Card type state management
  const [cardType, setCardType] = useState<'personal' | 'company'>('personal');

  const [inputErrorMessage, setInputErrorMessage] = useState({
    krCardNumber: '',
    krCardIdentifier: '',
    krCardExpiry: '',
    krCardPswFirst2: '',
  });
  // Example: controls submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Example: set error state
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const krCardNumberRef = useRef<any>(null);
  const krCardIdentifierRef = useRef<any>(null);
  const krCardExpiryRef = useRef<any>(null);
  const krCardPswFirst2Ref = useRef<any>(null);

  const initAirwallex = useCallback(async () => {
    // STEP #2: Initialize Airwallex on mount with the appropriate production environment and other configurations
    await init({
      enabledElements: ['payments'],
      env: 'demo',
    });

    // STEP #4: Create all elements in parallel using Promise.all for better performance
    const [krCardNumber, krCardIdentifier, krCardExpiry, krCardPswFirst2] = await Promise.all([
      createElement('krCardNumber'),
      createElement('krCardIdentifier', { cardType: 'personal' }),
      createElement('krCardExpiry'),
      createElement('krCardPswFirst2'),
    ]);

    // STEP #5: Mount all elements in parallel for better performance
    await Promise.all([
      krCardNumber?.mount('krCardNumber'),
      krCardIdentifier?.mount('krCardIdentifier'),
      krCardExpiry?.mount('krCardExpiry'),
      krCardPswFirst2?.mount('krCardPswFirst2'),
    ]);

    krCardNumberRef.current = krCardNumber;
    krCardIdentifierRef.current = krCardIdentifier;
    krCardExpiryRef.current = krCardExpiry;
    krCardPswFirst2Ref.current = krCardPswFirst2;

    // STEP #7: Add an event handler to ensure the element is mounted
    const onReady = (event: CustomEvent): void => {
      const { type } = event.detail;
      if (type === 'krCardNumber') {
        setCardNumberReady(true);
      }
      if (type === 'krCardIdentifier') {
        setIdentifierReady(true);
      }
      if (type === 'krCardExpiry') {
        setExpiryReady(true);
      }
      if (type === 'krCardPswFirst2') {
        setPswFirst2Ready(true);
      }
    };

    // STEP #8: Add an event listener to listen to the changes in each of the input fields
    const onChange = (event: CustomEvent) => {
      const { type, complete } = event.detail;
      if (type === 'krCardNumber') {
        setCardNumberComplete(complete);
      }
      if (type === 'krCardIdentifier') {
        setIdentifierComplete(complete);
      }
      if (type === 'krCardExpiry') {
        setExpiryComplete(complete);
      }
      if (type === 'krCardPswFirst2') {
        setPswFirst2Complete(complete);
      }
      console.log(`Elements changed with ${JSON.stringify(event.detail)}`);
    };
    // STEP #9: Add an event listener to get input focus status
    const onFocus = (event: CustomEvent) => {
      const { type } = event.detail;
      setInputErrorMessage((prev) => ({
        ...prev,
        [type]: '', // Example: clear input error message
      }));
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
    // Optimized event listener setup using batch processing
    const elementIds = ['krCardNumber', 'krCardIdentifier', 'krCardExpiry', 'krCardPswFirst2'];
    const eventTypes = [
      { type: 'onReady', handler: onReady },
      { type: 'onChange', handler: onChange },
      { type: 'onFocus', handler: onFocus },
      { type: 'onBlur', handler: onBlur },
    ];

    // Batch add event listeners for better performance
    elementIds.forEach((elementId) => {
      const element = document.getElementById(elementId);
      if (element) {
        eventTypes.forEach(({ type, handler }) => {
          element.addEventListener(type, handler as EventListener);
        });
      }
    });
  }, []);

  // Handle card type change
  const handleCardTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardType(event.target.value as 'personal' | 'company');
  };

  // Update identifier element when card type changes
  useEffect(() => {
    if (identifierReady && krCardIdentifierRef.current) {
      try {
        krCardIdentifierRef.current.update({ cardType });
        console.log('Updated identifier with cardType:', cardType);
      } catch (error) {
        console.error('Error updating identifier cardType:', error);
      }
    }
  }, [cardType, identifierReady]);

  // This effect should ONLY RUN ONCE as we do not want to reload Airwallex and remount the elements
  useEffect(() => {
    initAirwallex();
  }, [initAirwallex]);

  // STEP #6a: Add a button handler to trigger the payment request
  const handleConfirm = async () => {
    setIsSubmitting(true); // Example: set loading state
    setErrorMessage(''); // Example: reset error message
    if (krCardNumberRef.current) {
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
        const response = await krCardNumberRef.current?.confirmPaymentIntent({
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
  const allElementsReady = cardNumberReady && identifierReady && expiryReady && pswFirst2Ready;
  // Example: combine all element complete states
  const allElementsComplete = cardNumberComplete && identifierComplete && expiryComplete && pswFirst2Complete;

  console.log('allElementsComplete', allElementsComplete);
  console.log('cardNumberComplete', cardNumberComplete);
  console.log('identifierComplete', identifierComplete);
  console.log('expiryComplete', expiryComplete);
  console.log('pswFirst2Complete', pswFirst2Complete);
  console.log('isSubmitting', isSubmitting);
  const submitDisabled = !allElementsComplete || isSubmitting;

  // Example: Custom styling for the inputs, can be placed in css
  const inputStyle = {
    border: '1px solid',
    borderRadius: '5px',
    padding: '5px 10px',
    marginTop: '8px',
    height: '28px',
  };

  const radioGroupStyle = {
    display: 'flex',
    marginTop: '8px',
    gap: '20px',
  };

  const disabledStyle = {
    opacity: 0.5,
    cursor: 'not-allowed',
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
            id="krCardNumber"
            style={inputStyle} // Example: input styling can be moved to css
          />
          <p style={{ color: 'red' }}>{inputErrorMessage.krCardNumber}</p>
        </div>
        <div className="field-container">
          <div className="field-label">Card type</div>
          <div style={radioGroupStyle}>
            <label className="radio-label">
              <input
                type="radio"
                name="card-type-radio"
                value="personal"
                checked={cardType === 'personal'}
                onChange={handleCardTypeChange}
                className="radio-input"
              />
              <span>Personal</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="card-type-radio"
                value="company"
                checked={cardType === 'company'}
                onChange={handleCardTypeChange}
                className="radio-input"
              />
              <span>Company</span>
            </label>
          </div>
        </div>
        <div className="field-container">
          {cardType === 'company' && <div className="field-label">Business number</div>}
          {cardType === 'personal' && <div className="field-label">Date of Birth</div>}
          <div
            id="krCardIdentifier"
            style={inputStyle} // Example: input styling can be moved to css
          />
          <p style={{ color: 'red' }}>{inputErrorMessage.krCardIdentifier}</p>
        </div>
        <div className="field-container">
          <div className="field-label">Expiry</div>
          <div
            id="krCardExpiry"
            style={inputStyle} // Example: input styling can be moved to css
          />
          <p style={{ color: 'red' }}>{inputErrorMessage.krCardExpiry}</p>
        </div>
        <div className="field-container">
          <div className="field-label">First two digits of password</div>
          <div
            id="krCardPswFirst2"
            style={inputStyle} // Example: input styling can be moved to css
          />
          <p style={{ color: 'red' }}>{inputErrorMessage.krCardPswFirst2}</p>
        </div>
        {/* STEP #3b: Add a submit button to trigger the payment request */}
        <button
          onClick={handleConfirm}
          disabled={submitDisabled} // Prevents invalid submissions
          style={submitDisabled ? disabledStyle : {}}
        >
          {isSubmitting ? 'Loading' : 'Confirm'}
        </button>
      </div>
    </div>
  );
};

export default Index;

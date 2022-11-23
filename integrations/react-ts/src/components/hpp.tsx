/**
 * hpp.tsx
 * Airwallex Payment Demo - React Typescript.
 *
 * airwallex-payment-elements Hosted Payment Page integration in React Typescript
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/hpp.md
 */

import React from 'react';
// STEP #1: At the start of your file, import airwallex-payment-elements package
import { loadAirwallex, redirectToCheckout } from 'airwallex-payment-elements';
import { v4 as uuid } from 'uuid';
import { createPaymentIntent } from '../util';

export const Index: React.FC = () => {
  const mode = 'payment'; // Should be one of ['payment', 'recurring']
  const selectedBook = {
    url: 'https://via.placeholder.com/503x570',
    name: 'Sample product',
    desc: 'Example product',
    unit_price: 68,
    currency: 'USD',
    quantity: 1,
  };
  const theme = {
    popupWidth: 418,
    popupHeight: 549,
  };

  const redirectHppForCheckout = (intentId: string, clientSecret: string, currency: string) => {
    redirectToCheckout({
      env: 'demo',
      mode: 'payment',
      currency,
      intent_id: intentId, // Required, must provide intent details
      client_secret: clientSecret, // Required
      recurringOptions: {
        card: {
          next_triggered_by: 'customer',
          merchant_trigger_reason: 'scheduled',
          currency,
        },
      },
      theme,
      // For more detailed documentation at https://github.com/airwallex/airwallex-payment-demo/tree/master/docs#redirectToCheckout
    });
  };

  const redirectHppForRecurring = (intentId: string, clientSecret: string, currency: string) => {
    redirectToCheckout({
      env: 'demo',
      mode: 'recurring',
      currency,
      intent_id: intentId,
      client_secret: clientSecret, // Required
      recurringOptions: {
        card: {
          next_triggered_by: 'customer',
          merchant_trigger_reason: 'scheduled',
          currency,
        },
      },
      theme,
      // For more detailed documentation at https://github.com/airwallex/airwallex-payment-demo/tree/master/docs#redirectToCheckout
    });
  };

  const redirectHpp = (intentId: string, clientSecret: string, currency: string) => {
    try {
      if (mode === 'payment') {
        redirectHppForCheckout(intentId, clientSecret, currency);
      } else if (mode === 'recurring') {
        redirectHppForRecurring(intentId, clientSecret, currency);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleCheckout = async () => {
    try {
      // STEP #3: Initialize Airwallex on click with appropriate production environment and other configurations
      await loadAirwallex({
        env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
      });
      // STEP #4: create payment intent
      const intent = await createPaymentIntent({
        request_id: uuid(),
        merchant_order_id: uuid(),
        amount: selectedBook.unit_price,
        currency: selectedBook.currency,
        order: {
          products: [selectedBook],
        },
      });
      const { id, client_secret, currency } = intent || {};
      // STEP #5: Add a button handler to trigger the redirect to HPP
      redirectHpp(id, client_secret, currency);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ width: 1012, margin: '0px auto' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <img
          style={{
            filter: 'drop-shadow(0 24px 38px rgba(22, 37, 51, 0.32))',
          }}
          src={selectedBook.url}
          width={'416px'}
          height={'auto'}
          alt="book"
        />

        <div
          style={{
            width: 416,
            position: 'relative',
            textAlign: 'start',
          }}
        >
          <div
            style={{
              marginTop: 24,
              color: '#2A2A2A',
              fontSize: 40,
              fontWeight: 700,
              lineHeight: 1.25,
            }}
          >
            {selectedBook.name}
          </div>
          <div
            style={{
              marginTop: 32,
              color: '#2A2A2A',
              fontSize: 24,
              fontWeight: 700,
              lineHeight: 1.25,
            }}
          >
            {`$${selectedBook.unit_price}`}
          </div>
          {/* STEP #2: Add a checkout button */}
          <button
            style={{
              borderRadius: 2,
              backgroundColor: '#161412',
              width: '100%',
              margin: '32px 0px 0px 0px',
            }}
            color="primary"
            onClick={handleCheckout}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;

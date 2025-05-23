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

import React, { useCallback, useEffect } from 'react';
// STEP #1: At the start of your file, import airwallex-payment-elements package
import { init } from '@airwallex/components-sdk';
import { v4 as uuid } from 'uuid';
import { createPaymentIntent } from '../util';

export const Index: React.FC = () => {
  const mode = 'payment'; // Should be one of ['payment', 'recurring']

  const redirectHppForCheckout = useCallback(async (intentId: string, clientSecret: string, currency: string) => {
    const { payments } = await init({
      env: 'demo',
      enabledElements: ['payments'],
    });
    payments?.redirectToCheckout({
      mode: 'payment',
      currency,
      intent_id: intentId, // Required, must provide intent details
      client_secret: clientSecret, // Required
      // Customize the visual appearance of the HPP, more information can be found: https://www.airwallex.com/docs/js/payments/hosted-payment-page/#properties-appearance
      appearance: {
        mode: 'light', // choose between 'dark' and 'light'
      },
      recurringOptions: {
        card: {
          next_triggered_by: 'customer',
          merchant_trigger_reason: 'scheduled',
          currency,
        },
      },
      successUrl: `${window.location.origin}/checkout-success`,
      // For more detailed documentation at https://github.com/airwallex/airwallex-payment-demo/tree/master/docs#redirectToCheckout
    });
  }, []);

  const redirectHppForRecurring = useCallback(async (intentId: string, clientSecret: string, currency: string) => {
    const { payments } = await init({
      env: 'demo',
      enabledElements: ['payments'],
    });
    payments?.redirectToCheckout({
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
      // For more detailed documentation at https://github.com/airwallex/airwallex-payment-demo/tree/master/docs#redirectToCheckout
    });
  }, []);

  const redirectHpp = useCallback(
    (intentId: string, clientSecret: string, currency: string) => {
      try {
        if (mode === 'payment') {
          redirectHppForCheckout(intentId, clientSecret, currency);
        } else if (mode === 'recurring') {
          redirectHppForRecurring(intentId, clientSecret, currency);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [redirectHppForCheckout, redirectHppForRecurring],
  );

  const handleCheckout = useCallback(
    async (product: { url: string; name: string; desc: string; unit_price: number; currency: string; quantity: 1 }) => {
      try {
        // STEP #3: Initialize Airwallex on click with appropriate production environment and other configurations
        await init({
          env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
          enabledElements: ['payments'],
        });
        // STEP #4: create payment intent
        const intent = await createPaymentIntent({
          request_id: uuid(),
          merchant_order_id: uuid(),
          amount: product.unit_price * product.quantity,
          currency: product.currency,
          order: {
            products: [product],
          },
        });
        const { id, client_secret, currency } = intent || {};
        // STEP #5: Add a button handler to trigger the redirect to HPP
        redirectHpp(id, client_secret, currency);
      } catch (error) {
        console.error(error);
      }
    },
    [redirectHpp],
  );

  useEffect(() => {
    handleCheckout({
      url: 'https://via.placeholder.com/503x570',
      name: 'Sample product',
      desc: 'Example product',
      unit_price: 68,
      currency: 'USD',
      quantity: 1,
    });
  }, [handleCheckout]);

  return <div></div>;
};

export default Index;

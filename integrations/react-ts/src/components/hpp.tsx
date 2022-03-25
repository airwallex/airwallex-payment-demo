/**
 * hpp.tsx
 * Airwallex Payment Demo - React Typescript.  Created by Olivia Wei and Josie Ku.
 *
 * airwallex-payment-elements Hosted Payment Page integration in React Typescript
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/hpp.md
 */

import React from 'react';
// STEP #1: At the start of your file, import airwallex-payment-elements package
import { redirectToCheckout, loadAirwallex } from 'airwallex-payment-elements';

// Enter your Payment Intent secret keys here
// More on getting these secrets: https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro
const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';
const currency = 'replace-with-your-currency';
const mode = 'payment'; // Should be one of ['payment', 'recurring']

const Index: React.FC = () => {
  const redirectHppForCheckout = () => {
    redirectToCheckout({
      env: 'demo',
      mode: 'payment',
      currency,
      intent_id, // Required, must provide intent details
      client_secret, // Required
      theme: {
        // Must provide theme to display the checkout page properly
        fonts: [
          // Customizes the font for the payment elements
          {
            src: 'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',
            family: 'AxLLCircular',
            weight: 400,
          },
        ],
      },
      successUrl: 'https://www.google.com', // Must be HTTPS sites
      failUrl: 'https://www.google.com', // Must be HTTPS sites
      // For more detailed documentation at https://github.com/airwallex/airwallex-payment-demo/tree/master/docs#redirectToCheckout
    });
  };

  const redirectHppForRecurring = () => {
    redirectToCheckout({
      env: 'demo',
      mode: 'recurring',
      currency,
      client_secret, // Required
      recurringOptions: {
        card: {
          next_triggered_by: 'customer',
          merchant_trigger_reason: 'scheduled',
          requires_cvc: true,
          currency,
        },
      },
      theme: {
        // Must provide theme to display the checkout page properly
        fonts: [
          // Customizes the font for the payment elements
          {
            src: 'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',
            family: 'AxLLCircular',
            weight: 400,
          },
        ],
      },
      successUrl: 'https://www.google.com', // Must be HTTPS sites
      failUrl: 'https://www.google.com', // Must be HTTPS sites
      // For more detailed documentation at https://github.com/airwallex/airwallex-payment-demo/tree/master/docs#redirectToCheckout
    });
  };

  // STEP #3: Add a button handler to trigger the redirect to HPP
  const redirectHpp = async (): Promise<void> => {
    try {
      // STEP #3a: Initialize Airwallex on click with appropriate production environment and other configurations
      await loadAirwallex({
        env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
      });
      // STEP #3b: Redirect the customer to Airwallex checkout
      if (mode === 'payment') {
        redirectHppForCheckout();
      } else if (mode === 'recurring') {
        redirectHppForRecurring();
      }
    } catch (error) {
      // STEP #4: Catch error events
      /**
       * ... Handle event on error
       */
      window.alert(`There was an error with HPP redirection: ${JSON.stringify(error)}`);
    }
  };

  return (
    <div>
      <h2>Hosted payment page (HPP) integration</h2>
      {/* STEP #2: Add a checkout button */}
      <button onClick={redirectHpp}>Redirect to HPP</button>
    </div>
  );
};

export default Index;

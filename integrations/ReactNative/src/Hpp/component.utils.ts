/**
 * Hpp/component.utils.ts
 * Airwallex Payment Demo - React Native.  Created by Josie Ku.
 *
 * airwallex-payment-elements Hosted Payment Page integration in React Native
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.  This file contains the HTML
 * body supplied to React Native Webview.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/card.md
 */
import {cssStyles} from '../CommonStyles';

interface PaymentIntentDetails {
  intent_id: string;
  client_secret: string;
}

export const generateHTML = ({
  intent_id,
  client_secret,
}: PaymentIntentDetails) => `
    <html>
    <head lang='en'>
      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
      <!-- 
        STEP #1: Import airwallex-payment-elements bundle 
                - You MUST replace the bundle version to the latest NPM version
                  in order to import the package properly!
      -->
      <script src="https://checkout.airwallex.com/assets/bundle.x.x.x.min.js"></script>
    </head>
    <body>
      <!-- STEP #3: Add a checkout button -->
      <button id="hpp">Pay Now</button>
      <script>
        const intent_id = 'replace-with-your-intent-id';
        const client_secret = 'replace-with-your-client-secret';
        const currency = 'replace-with-your-currency';
        const mode = 'payment'; // Should be one of ['payment', 'recurring']

        const redirectHppForCheckout = () => {
          Airwallex.redirectToCheckout({
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
                  src:
                    'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',
                  family: 'AxLLCircular',
                  weight: 400,
                },
              ],
            },
            successUrl: 'https://www.google.com', // Must be HTTPS sites
            failUrl: 'https://www.google.com', // Must be HTTPS sites
            // For more detailed documentation at https://github.com/airwallex/airwallex-payment-demo/tree/master/docs#redirectToCheckout
          });
        }
  
        const redirectHppForRecurring = () => {
          Airwallex.redirectToCheckout({
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
                  src:
                    'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',
                  family: 'AxLLCircular',
                  weight: 400,
                },
              ],
            },
            successUrl: 'https://www.google.com', // Must be HTTPS sites
            failUrl: 'https://www.google.com', // Must be HTTPS sites
            // For more detailed documentation at https://github.com/airwallex/airwallex-payment-demo/tree/master/docs#redirectToCheckout
          });
        }
        
        // STEP #2: Initialize the Airwallex package with the appropriate environment
        Airwallex.init({
          env: 'staging', // Setup which env('staging' | 'demo' | 'prod') you would like to integrate with
          origin: '*', // There is no origin in React Native WebView, so we set it as any
        });
        
        // STEP #4: Add a button handler to trigger the redirect to HPP
        document.getElementById('hpp').addEventListener('click', () => {
          if (mode === 'payment') {
            redirectHppForCheckout();
          } else if (mode === 'recurring') {
            redirectHppForRecurring();
          }
        });
      </script>
    </body>
    <style>
      ${cssStyles}
    </style>
  </html>
`;

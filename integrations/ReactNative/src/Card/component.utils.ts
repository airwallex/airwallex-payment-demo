/**
 * Card/component.utils.ts
 * Airwallex Payment Demo - React Native.  Created by Josie Ku.
 *
 * airwallex-payment-elements Card element integration in React Native
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.  This file contains the HTML
 * body supplied to React Native Webview. The event handling in done in
 * the adjacent index.ts file.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/card.md
 */

import {cssStyles} from '../CommonStyles'; // Example: This file helps add css styles to the iframe, can be customized or removed

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
              - React Native only works with package version 0.2.15 and above
    -->
    <script src="https://checkout.airwallex.com/assets/elements.bundle.min.js"></script>
  </head>
  <body>
    <div id="card-container">
      <!-- STEP #3a: Add an empty container for the card element to be injected into -->
      <div id='card'></div>
      <p id="input-error"  style="color: red"></p>
      <!-- STEP #3b: Add a submit button to trigger the payment request -->
      <button id="submit" disabled="true">Submit</button>
    </div>
    <script>
      // foiwjefow
      // STEP #2: Initialize the Airwallex global context for event communication
      Airwallex.init({
        env: 'staging', // Setup which env('staging' | 'demo' | 'prod') you would like to integrate with
        origin: '*', // There is no origin in React Native WebView, so we set it as any
        fonts: [
          {
            src:
              'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',
            family: 'AxLLCircular',
            weight: 400,
          },
        ]
      });

      // STEP #4: Create 'card' element
      const card = Airwallex.createElement('card');

      // STEP #5: Mount card element
      card.mount('card');  

      // STEP #6A: Add a button handler to trigger the payment request
      document.getElementById('submit').addEventListener('click', () => {
        document.getElementById('submit').innerHTML = "Processing..."; // Example: set submitting state
        document.getElementById('submit').disabled = true; // Example: disable button to prevent double submission

        // Use Airwallex.confirmPaymentIntent function to confirm payment
        Airwallex.confirmPaymentIntent({
          element: card,
          id: '${intent_id}', // Required
          client_secret: '${client_secret}', // Required
        })
          // STEP #6B, #6C: Success/Error responses are handled directly in React Native
          //                See ReactNativeWebview's onMessage attribute in src/Card/index.tsx 
          .finally(() => {
            document.getElementById('submit').innerHTML = 'Submit'; // Example: reset button state
            document.getElementById('submit').disabled = false; // Example: reset button state
          });
      });

      // STEP #7: Event listener for element onMount is handled in React Native
      //          See ReactNativeWebview's onMessage attribute in src/Card/index.tsx 

      // STEP #8: Add an event listener to validate element input
      document.addEventListener('onChange', (event) => {
        const { type, complete } = event.detail;
        document.getElementById('submit').disabled = !complete;
      })
      // STEP #9: Add an event listener to get input focus status
      document.addEventListener('onFocus', (event) => {
        const element = document.getElementById('input-error');
        if (element) {
          element.innerHTML = '' // Example: clear input error message
        }
        // Customize your input focus style by listen onFocus event
      });

      // STEP #10: Add an event listener to show input error message when finish typing
      document.addEventListener('onBlur', (event) => {
        const { complete } = event.detail;
        const { error } = event.detail;
        const element = document.getElementById('input-error');
        if (element && error) {
          element.innerHTML = error.message || JSON.stringify(error); // Example: set input error message
        }
      });
    </script>
  </body>
  <style>
    ${cssStyles}
  </style>
</html>
`;

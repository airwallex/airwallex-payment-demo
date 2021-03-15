/**
 * SplitCard/component.utils.ts
 * Airwallex Payment Demo - React Native.  Created by Josie Ku.
 *
 * airwallex-payment-elements SplitCard integration in React Native
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.  This file contains the HTML
 * body supplied to React Native Webview.  The event handling in done in
 * the adjacent index.ts file.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/splitcard.md
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
    <!-- 
      STEP #3a: Add empty containers for the split card elements to be placed into
      - Ensure these are the only elements in your document with these id, otherwise 
        the elements may fail to mount.  
    -->
    <div class="field-container">
      <p>Card number</p>
      <div id="cardNumber"></div>
      <p id="cardNumber-error"></p>
    </div>
    <div class="field-container">
      <p>Expiry</p>
      <div id="expiry"></div>
      <p id="expiry-error"></p>
    </div>
    <div class="field-container">
      <p>Cvc</p>
      <div id="cvc"></div>
      <p id="cvc-error"></p>
    </div>
    <!-- STEP #3b: Add a submit button to trigger the payment request -->
    <button id="submit">Submit</button>
    <script>
    //
      // STEP #2: Initialize the Airwallex global context for event communication
      Airwallex.init({
        env: 'staging', // Setup which env('staging' | 'demo' | 'prod') you would like to integrate with
        origin: '*', // There is no origin in React Native WebView, so we set it as any
        fonts: [
          // Customizes the font for the payment elements
          {
            src:
              'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',
            family: 'AxLLCircular',
            weight: 400,
          },
        ]
      });

      // STEP #4: Create split card elements
      const cardNumber = Airwallex.createElement('cardNumber');
      const expiry = Airwallex.createElement('expiry');
      const cvc = Airwallex.createElement('cvc');

      // STEP #5: Mount split card elements
      cardNumber.mount('cardNumber'); // This 'cardNumber' id MUST MATCH the id on your cardNumber empty container created in Step 3
      expiry.mount('expiry'); // Same as above
      cvc.mount('cvc'); // Same as above
      
      // STEP #6a: Add a button handler to trigger the payment request
      document.getElementById('submit').addEventListener('click', () => {
        document.getElementById('submit').innerHTML = "Processing..."; // Example: Set submit state
        document.getElementById('submit').disabled = true; // Example: disable button to prevent user from duplicate submissions

        Airwallex.confirmPaymentIntent({
          element: cardNumber, // Only need to submit CardNumber element
          id: '${intent_id}',
          client_secret: '${client_secret}',
        })
          // STEP #6B, #6C: Success/Error responses are handled directly in React Native
          //                See ReactNativeWebview's onMessage attribute in src/SplitCard/index.tsx 
          .catch(()=>{
            // Pass, just to catch errors
          })
          .finally(() => {
            document.getElementById('submit').innerHTML = 'Submit'; // Example: Reset submit state
            document.getElementById('submit').disabled = false; // Example: Reset submit state
          });
      });

      // STEP #7: Element on ready/on mount events are handled in React Native
      //          See ReactNativeWebview's onMessage attribute in src/SplitCard/index.tsx  

      // Set up local variable to validate element inputs
      const elementsCompleted = {
        cardNumber: false,
        expiry: false,
        cvc: false,
      };

      // STEP #8: Add an event listener to listen to the changes in each of the input fields
      window.addEventListener('onChange', (event) => {
        const { type, complete } = event.detail;
        if (elementsCompleted.hasOwnProperty(type)) {
          elementsCompleted[type] = complete; // Set element completion state
        }

        // Check if all elements are completed and set submit button disabled state
        const allElementsCompleted = !Object.values(elementsCompleted).includes(
          false,
        );

        document.getElementById('submit').disabled = !allElementsCompleted; // Example: Enable button only when all fields are completed
      })
      // STEP #9: Add an event listener to get input focus status
      window.addEventListener('onFocus', (event) => {
        // Customize your input focus style by listen onFocus event
      });

      // STEP #10: Add an event listener to show input error message when finish typing
      window.addEventListener('onBlur', (event) => {
        const { error, type } = event.detail;
        const element = document.getElementById(type + '-error');
        if (element) {
          element.innerHTML = error.message || JSON.stringify(error); // Example: set input error message
        }
      });
      // STEP #11: Error events are handled in React Native
      //          See ReactNativeWebview's onMessage attribute in src/SplitCard/index.tsx  
    </script>
  </body>
  <style>
    ${cssStyles}
    #cardNumber, #expiry, #cvc {
      border: 1px solid black;
      border-radius: 5px;
      padding: 5px 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 5px;
    }
  </style>
</html>
`;

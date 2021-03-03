/**
 * DropIn/component.utils.ts
 * Airwallex Payment Demo - React Native.  Created by Josie Ku.
 *
 * airwallex-payment-elements DropIn element integration in React Native
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.  This file contains the HTML
 * body supplied to React Native Webview.  The event handling in done in
 * the adjacent index.ts file.
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
                  - React Native only works with package version 0.2.15 and above
      -->
      <script src="https://checkout.airwallex.com/assets/bundle.x.x.x.min.js"></script>
    </head>
    <body>
      <!-- 
        STEP #3: Add an empty container for the dropIn element to be injected into 
        - Ensure this is the only element in your document with this id, otherwise the element may fail to mount.
      -->
      <div id='dropIn'></div>
      <script>
        // STEP #2: Initialize the Airwallex global context for event communication
        Airwallex.init({
          env: 'staging', // Setup which env('staging' | 'demo' | 'prod') you would like to integrate with
          origin: '*',  // There is no origin in React Native WebView, so we set it as any
          fonts: [
            // Customizes the font for the payment elements
            {
              src:
                'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',
              family: 'AxLLCircular',
              weight: 400,
            },
          ],
        });//

        // STEP #4: Create 'dropIn' element
        const element = Airwallex.createElement('dropIn', {
          intent: { 
            // Required, dropIn use intent Id and client_secret to prepare checkout
            id: '${intent_id}',
            client_secret: '${client_secret}'
          },
          components: ['card', 'alipaycn', 'alipayhk']
        });

        // STEP #5: Mount 'dropIn' element
        element.mount('dropIn'); // This 'dropIn' id MUST MATCH the id on your empty container created in Step 3

        // STEP #6,7,8: Event listeners are handled in React Native
        //              See ReactNativeWebview's onMessage attribute in src/DropIn/index.tsx 
      </script>
    </body>
    <style>
      ${cssStyles}
    </style>
  </html>
`;

import {cssStyles} from '../CommonStyles';

const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

export const html = `
<html>
    <head lang='en'>
      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
      <script src="https://checkout.airwallex.com/assets/bundle.x.x.x.min.js"></script>
    </head>
    <body>
      <button id="hpp">Pay Now</button>
      <script>
        Airwallex.init({
          env: 'demo', // Setup which env('staging' | 'demo' | 'prod') you would like to integrate with
          origin: '*', // Setup your event target to receive the browser events message
        });
        
        document.getElementById('hpp').addEventListener('click', () => {
          // STEP #4: Add a button handler to trigger the redirect to HPP
          Airwallex.redirectToCheckout({
            env: 'dev', // Which env('staging' | 'demo' | 'prod') you would like to integrate with
            id: ${intent_id},
            client_secret: ${client_secret},
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
        });
      </script>
    </body>
    <style>
      ${cssStyles}
    </style>
  </html>
`;

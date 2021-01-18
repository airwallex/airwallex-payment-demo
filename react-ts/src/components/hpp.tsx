import React from 'react';
import { redirectToCheckout, loadAirwallex } from 'airwallex-payment-elements';

const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

const Index: React.FC = () => {
  const redirectHpp = async () => {
    try {
      // STEP 2: Initialize Airwallex on click with appropriate production environment and other configurations
      await loadAirwallex({
        env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
        locale: 'zh', // doesn't work yet
      });
      // STEP 3: Redirect the customer to Airwallex checkout
      await redirectToCheckout({
        env: 'demo',
        id: intent_id,
        client_secret: client_secret,
        theme: {
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
        locale: 'zh',
      });
    } catch (error) {
      /*
      ... Handle event on error
       */
      window.alert(
        `There was an error with HPP redirection: ${JSON.stringify(error)}`,
      );
    }
  };

  return (
    <div>
      <h2>Option #1: Hosted payment page (HPP) integration</h2>
      {/* STEP 1: Create a button to redirect customer to Airwallex for payment processing */}
      <button onClick={redirectHpp}>Redirect to HPP</button>
    </div>
  );
};

export default Index;

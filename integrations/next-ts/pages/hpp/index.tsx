import { redirectToCheckout, loadAirwallex } from 'airwallex-payment-elements';

const intent_id = 'int_d39jDcBwzndyDsBI5zPwvxLXeXS';
const client_secret =
  'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTEwNDM4MTQsImV4cCI6MTYxMTA0NzQxNCwiYWNjb3VudF9pZCI6ImZmMjI1YzEzLWQ5ODEtNDU2Yy1iZjk3LWYzODIxYzg1YTEyMiIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IkhLIiwiaW50ZW50X2lkIjoiaW50X2QzOWpEY0J3em5keURzQkk1elB3dnhMWGVYUyJ9.BQ7A0rr2Z22thv_vhiEYuUGFUn3HgT4H9d14RgEpViw';
async function redirectHpp() {
  try {
    // STEP 2: Initialize Airwallex on click with appropriate production environment and other configurations
    await loadAirwallex({
      env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
      origin: window.location.origin, // Setup your event target to receive the browser events message
    });
    // STEP 3: Redirect the customer to Airwallex checkout
    await redirectToCheckout({
      env: 'demo',
      id: intent_id,
      client_secret: client_secret,
      failUrl: 'https://www.google.com', // must be a https valid url
      successUrl: 'https://www.google.com', // must be a https valid url
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
      // See docs for more customizations! https://github.com/airwallex/airwallex-payment-elements/documentation.md#redirectToCheckout
    });
  } catch (error) {
    /*
      ... Handle event on error
    */
    window.alert(
      `There was an error with HPP redirection: ${JSON.stringify(error)}`,
    );
  }
}

export default function hpp() {
  return (
    <div>
      <h2>Host Payment Page (HPP) Integration</h2>
      {/* STEP 1: Create a button to redirect customer to Airwallex for payment processing */}
      <button onClick={redirectHpp}>Click to redirect</button>
    </div>
  );
}

import { useEffect } from 'react';
import {
  createElement,
  loadAirwallex,
  ElementType,
} from 'airwallex-payment-elements';

// const intent_id = 'replace-with-your-intent-id';
// const client_secret = 'replace-with-your-client-secret';
const intent_id = 'int_d39jDcBwzndyDsBI5zPwvxLXeXS';
const client_secret =
  'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTEwNDM4MTQsImV4cCI6MTYxMTA0NzQxNCwiYWNjb3VudF9pZCI6ImZmMjI1YzEzLWQ5ODEtNDU2Yy1iZjk3LWYzODIxYzg1YTEyMiIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IkhLIiwiaW50ZW50X2lkIjoiaW50X2QzOWpEY0J3em5keURzQkk1elB3dnhMWGVYUyJ9.BQ7A0rr2Z22thv_vhiEYuUGFUn3HgT4H9d14RgEpViw';

const ELEMENT_TYPE: ElementType = 'dropIn';

export default function dropin() {
  useEffect(() => {
    // STEP 2: Initialize Airwallex on mount with the appropriate production environment and other configurations
    loadAirwallex({
      env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
      origin: window.location.origin, // Setup your event target to receive the browser events message
      fonts: [
        // Customizes the font for the payment elements
        {
          src:
            'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',
          family: 'AxLLCircular',
          weight: 400,
        },
      ],
    }).then(() => {
      // STEP 3: Create and mount the drop-in element
      createElement(ELEMENT_TYPE, {
        intent: {
          // Intent is required for the drop-in element
          id: intent_id,
          client_secret: client_secret,
        },
        // See docs for more customizations! https://github.com/airwallex/airwallex-payment-elements/documentation.md#createElement
      })?.mount(ELEMENT_TYPE);
    });

    const onSuccess = (event: CustomEvent) => {
      /*
        ... Handle event on success
      */
      console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
    };

    const onError = (event: CustomEvent) => {
      /*
        ... Handle event on error
      */
      console.log(`Confirm error with ${JSON.stringify(event.detail)}`);
    };

    window.addEventListener('onSuccess', onSuccess as EventListener);
    window.addEventListener('onError', onError as EventListener);
    return () => {
      window.removeEventListener('onSuccess', onSuccess as EventListener);
      window.removeEventListener('onError', onError as EventListener);
    };
  });

  return (
    <div>
      <h2>DropIn Integration</h2>
      {/* STEP 1: Add an empty container for the drop-in element to be placed into */}
      <div className="element" id={ELEMENT_TYPE}></div>
    </div>
  );
}

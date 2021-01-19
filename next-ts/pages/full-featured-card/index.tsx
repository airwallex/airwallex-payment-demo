import { useEffect } from 'react';
import {
  createElement,
  loadAirwallex,
  ElementType,
} from 'airwallex-payment-elements';

// const intent_id = 'replace-with-your-intent-id';
// const client_secret = 'replace-with-your-client-secret';
const intent_id = 'int_jHQ3oq7PztYfdpeVtzMMlxg8Vbf';
const client_secret =
  'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTEwNDc5NTYsImV4cCI6MTYxMTA1MTU1NiwiYWNjb3VudF9pZCI6ImZmMjI1YzEzLWQ5ODEtNDU2Yy1iZjk3LWYzODIxYzg1YTEyMiIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IkhLIiwiaW50ZW50X2lkIjoiaW50X2pIUTNvcTdQenRZZmRwZVZ0ek1NbHhnOFZiZiJ9.aredlqspxqzCBHePKIQOZWgDLS6rp5DIYYGPR4KZtMk';

const ELEMENT_TYPE: ElementType = 'fullFeaturedCard';

export default function fullFeaturedCard() {
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
      // STEP 3: Create and mount the full featured card element
      createElement(ELEMENT_TYPE, {
        intent: {
          id: intent_id,
          client_secret: client_secret,
        },
      })?.mount(ELEMENT_TYPE);
    });

    const onSuccess = (event: CustomEvent) => {
      /*
        ... Handle event
      */
      console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
    };

    const onError = (event: CustomEvent) => {
      /*
        ... Handle event
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
      <h2>Full Featured Card Integration</h2>
      {/* STEP 1: Add an empty container for the full featured card element to be placed into */}
      <div className="element" id={ELEMENT_TYPE}></div>
    </div>
  );
}

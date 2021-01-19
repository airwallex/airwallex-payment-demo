import { useEffect } from 'react';
import {
  createElement,
  loadAirwallex,
  ElementType,
} from 'airwallex-payment-elements';

// const intent_id = 'replace-with-your-intent-id';
// const client_secret = 'replace-with-your-client-secret';
const intent_id = 'int_6QSnVZ2QzlZ3SGghOzHN6OoFdyY';
const client_secret =
  'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTEwNDgzMTIsImV4cCI6MTYxMTA1MTkxMiwiYWNjb3VudF9pZCI6ImZmMjI1YzEzLWQ5ODEtNDU2Yy1iZjk3LWYzODIxYzg1YTEyMiIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IkhLIiwiaW50ZW50X2lkIjoiaW50XzZRU25WWjJRemxaM1NHZ2hPekhONk9vRmR5WSJ9.bMy3hrS-m8dXiY79CaQD5xvcqA7IwajpkFKUSlmZKOA';

const ELEMENT_TYPE: ElementType = 'wechat';

export default function wechat() {
  useEffect(() => {
    // STEP 2: Initialize Airwallex on mount with the appropriate production environment and other configurations
    loadAirwallex({
      env: 'demo', // Can choose other production environments, 'staging | 'demo' | 'prod'
      origin: window.location.origin, // Setup your event target to receive the browser events message
    }).then(() => {
      // STEP 3: Create and mount the wechat element
      createElement(ELEMENT_TYPE, {
        intent: {
          id: intent_id,
          client_secret,
        },
        origin: window.location.origin,
      })?.mount(ELEMENT_TYPE);
    });
    const onSuccess = (event: CustomEvent) => {
      /*
        ... Handle event
      */
      console.log(`Confirm success with ${JSON.stringify(event.detail)}`);
    };

    window.addEventListener('onSuccess', onSuccess as EventListener);
    return () => {
      window.removeEventListener('onSuccess', onSuccess as EventListener);
    };
  }, []);

  return (
    <div>
      <h2>Wechat element integration</h2>
      {/* STEP 1: Add an empty container for the wechat element to be placed into */}
      <div className="element" id={ELEMENT_TYPE}></div>
    </div>
  );
}

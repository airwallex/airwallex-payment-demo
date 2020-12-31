import { useEffect } from 'react';
import {
  createElement,
  loadAirwallex,
  ElementType,
  RedirectMethodOptions,
} from 'airwallex-payment-elements';

const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';
const redirectMethod = 'replace-with-your-redirect-method';
const ELEMENT_TYPE: ElementType = 'redirect';

export default function redirect() {
  useEffect(() => {
    loadAirwallex({
      env: 'staging',
      origin: window.location.origin,
    }).then(() => {
      createElement(ELEMENT_TYPE, {
        intent: {
          id: intent_id,
          client_secret,
        },
        method: redirectMethod as RedirectMethodOptions,
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
      <h2>Redirect integration</h2>
      <div className="element" id={ELEMENT_TYPE}></div>
    </div>
  );
}
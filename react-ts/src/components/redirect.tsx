import { useEffect } from 'react';
import { createElement, loadAirwallex, ElementType, RedirectMethodOptions } from 'airwallex-payment-elements';

const intentId = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';
const redirectMethod = 'replace-with-your-redirect-method';
const ELEMENT_TYPE: ElementType = 'redirect';

const Index: React.FC = () => {
  useEffect(() => {
    loadAirwallex({
      env: 'staging',
      origin: window.location.origin,
    }).then(() => {
      createElement(ELEMENT_TYPE, {
        intent: {
          id: intentId,
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
      <h2>Option #7: Redirect integration</h2>
      <div id={ELEMENT_TYPE}></div>
    </div>
  );
};

export default Index;

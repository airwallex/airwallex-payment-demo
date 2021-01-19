import { useEffect } from 'react';
import {
  createElement,
  loadAirwallex,
  ElementType,
} from 'airwallex-payment-elements';

const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';
const ELEMENT_TYPE: ElementType = 'fullFeaturedCard';

export default function fullFeaturedCard() {
  useEffect(() => {
    loadAirwallex({
      env: 'demo',
      origin: window.location.origin
    }).then(()=>{
      console.log('loaded airwallex');
    })
    .then(()=>{
      createElement(ELEMENT_TYPE, {
        intent: {
          id: intent_id,
          client_secret: client_secret
        }
      })?.mount(ELEMENT_TYPE);
    })
  
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
  })

  return (
    <div>
      <h2>Full Featured Card Integration</h2>
      <div className="element" id={ELEMENT_TYPE}></div>
    </div>
  )
}
import { redirectToCheckout, loadAirwallex } from 'airwallex-payment-elements';

const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

async function redirectHpp(){
  try {
    await loadAirwallex({
      env: 'demo',
      origin: window.location.origin
    });
    await redirectToCheckout({
      env: 'demo',
      id: intent_id,
      client_secret: client_secret,
    })
  } catch(e) {
    console.error('there was an error', e);
  }
}

export default function hpp() {
  return (
    <div>
      <h2>Host Payment Page (HPP) Integration</h2>
      <button onClick={redirectHpp}>Click to redirect</button>
    </div>
  )
}

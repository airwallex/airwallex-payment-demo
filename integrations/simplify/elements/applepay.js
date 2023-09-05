Airwallex.init({ env: 'demo' });
const applePayButtonElement = Airwallex.createElement('applePayButton', { amount: {
  value: 200,
  currency: 'HKD',
}, countryCode: 'HK', client_secret: 'REPLACE_YOUR_CLIENT_SECRET' });
applePayButtonElement.mount('elementContainer');

Airwallex.init({ env: 'demo' });
const applePayButtonElement = Airwallex.createElement('applePayButton', { amount: {
  value: 200,
  currency: 'HKD',
}, countryCode: 'HK', client_secret: 'replace-with-your-client-secret' });
applePayButtonElement.mount('elementContainer');

Airwallex.init({ env: 'demo' });
const googlePayButtonElement = Airwallex.createElement('googlePayButton', { amount: {
  value: 200,
  currency: 'HKD',
}, countryCode: 'HK', client_secret: 'replace-with-your-client-secret' });
googlePayButtonElement.mount('elementContainer');

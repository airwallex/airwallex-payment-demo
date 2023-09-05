Airwallex.init({ env: 'demo' });
const googlePayButtonElement = Airwallex.createElement('googlePayButton', { amount: {
  value: 200,
  currency: 'HKD',
}, countryCode: 'HK', client_secret: 'REPLACE_YOUR_CLIENT_SECRET' });
googlePayButtonElement.mount('elementContainer');

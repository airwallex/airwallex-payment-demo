Airwallex.init({ env: 'demo' });
const dropInElement = Airwallex.createElement('dropIn', { currency: 'HKD', client_secret: 'REPLACE_YOUR_CLIENT_SECRET' });
dropInElement.mount('elementContainer');

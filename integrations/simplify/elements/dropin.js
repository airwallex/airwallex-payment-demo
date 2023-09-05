Airwallex.init({ env: 'demo' });
const dropInElement = Airwallex.createElement('dropIn', { currency: 'HKD', client_secret: 'replace-with-your-client-secret' });
dropInElement.mount('elementContainer');

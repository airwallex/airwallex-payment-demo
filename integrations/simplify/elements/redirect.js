Airwallex.init({ env: 'demo' });
const redirectElement = Airwallex.createElement('redirect', { method: 'alipayhk', client_secret: 'REPLACE_YOUR_CLIENT_SECRET' });
redirectElement.mount('elementContainer');

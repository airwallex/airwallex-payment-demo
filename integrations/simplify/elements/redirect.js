Airwallex.init({ env: 'demo' });
const redirectElement = Airwallex.createElement('redirect', { method: 'alipayhk', client_secret: 'replace-with-your-client-secret' });
redirectElement.mount('elementContainer');

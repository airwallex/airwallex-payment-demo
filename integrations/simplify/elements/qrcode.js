Airwallex.init({ env: 'demo' });
const qrcodeElement = Airwallex.createElement('qrcode', { client_secret: 'REPLACE_YOUR_CLIENT_SECRET' });
qrcodeElement.mount('elementContainer');

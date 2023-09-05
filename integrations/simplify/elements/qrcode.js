Airwallex.init({ env: 'demo' });
const qrcodeElement = Airwallex.createElement('qrcode', { client_secret: 'replace-with-your-client-secret' });
qrcodeElement.mount('elementContainer');

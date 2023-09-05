Airwallex.init({ env: 'demo' });
const cardElement = Airwallex.createElement('card')
cardElement.mount('elementContainer');
document.getElementById('payButton').addEventListener('click', () => {
  Airwallex.confirmPaymentIntent({
    element: cardElement,
    client_secret: 'replace-with-your-client-secret',
  });
});

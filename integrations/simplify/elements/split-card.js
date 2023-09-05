Airwallex.init({ env: 'demo' });
const cardNumberElement = Airwallex.createElement('cardNumber');
cardNumberElement.mount('elementContainer');
Airwallex.createElement('expiry').mount('elementContainer2');
Airwallex.createElement('cvc').mount('elementContainer3');
document.getElementById('payButton').addEventListener('click', () => {
  Airwallex.confirmPaymentIntent({
    element: cardNumberElement,
    client_secret: 'REPLACE_YOUR_CLIENT_SECRET',
  });
});

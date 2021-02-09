import {cssStyles} from '../CommonStyles';

const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

export const html = `
<html>
  <head lang='en'>
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
    <script src="https://checkout.airwallex.com/assets/bundle.x.x.x.min.js"></script>
  </head>
  <body>
    <div class="field-container">
      <p>Card number</p>
      <div id="cardNumber"></div>
    </div>
    <div class="field-container">
      <p>Expiry</p>
      <div id="expiry"></div>
    </div>
    <div class="field-container">
      <p>Cvc</p>
      <div id="cvc"></div>
    </div>
    <button id="submit">Submit</button>
    <script>
      Airwallex.init({
        env: 'demo', // Setup which env('staging' | 'demo' | 'prod') you would like to integrate with
        origin: '*', // There is no origin in React Native WebView, so we set it as e
        fonts: [
          {
            src:
              'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',
            family: 'AxLLCircular',
            weight: 400,
          },
        ]
      });

      const cardNumber = Airwallex.createElement('cardNumber');
      const expiry = Airwallex.createElement('expiry');
      const cvc = Airwallex.createElement('cvc');

      cardNumber.mount('cardNumber'); // This 'cardNumber' id MUST MATCH the id on your cardNumber empty container created in Step 3
      expiry.mount('expiry'); // Same as above
      cvc.mount('cvc'); // Same as above

      document.getElementsByTagName('iframe')[0].style.height = 500;
      
      document.getElementById('submit').addEventListener('click', () => {
        document.getElementById('submit').innerHTML = "Processing...";
        document.getElementById('submit').disabled = true;

        Airwallex.confirmPaymentIntent({
          element: cardNumber,
          id: '${intent_id}',
          client_secret: '${client_secret}',
        })
          .finally(() => {
            document.getElementById('submit').innerHTML = 'Submit';
            document.getElementById('submit').disabled = false;
          });
      });

      const elementsCompleted = {
        cardNumber: false,
        expiry: false,
        cvc: false,
      };

      window.addEventListener('onChange', (event) => {
        const { type, complete } = event.detail;
        if (elementsCompleted.hasOwnProperty(type)) {
          elementsCompleted[type] = complete; // Set element completion state
        }

        // Check if all elements are completed, and set submit button disabled state
        const allElementsCompleted = !Object.values(elementsCompleted).includes(
          false,
        );
        document.getElementById('submit').disabled = !allElementsCompleted;
      })
    </script>
  </body>
  <style>
    ${cssStyles}
    #cardNumber, #expiry, #cvc {
      border: 1px solid black;
      border-radius: 5px;
      padding: 5px 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 5px;
    }
  </style>
</html>
`;

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
    <div id="card-container">
      <div id='card'></div>
      <button id="submit" disabled="true">Submit</button>
    </div>
    <script>
      Airwallex.init({
        env: 'dev', // Setup which env('staging' | 'demo' | 'prod') you would like to integrate with
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
      const card = Airwallex.createElement('card');
      card.mount('card');
      
      document.getElementsByTagName('iframe')[0].style.height = 500;

      document.getElementById('submit').addEventListener('click', () => {
        document.getElementById('submit').innerHTML = "Processing...";
        document.getElementById('submit').disabled = true;

        Airwallex.confirmPaymentIntent({
          element: card,
          id: '${intent_id}',
          client_secret: '${client_secret}',
        })
          .finally(() => {
            document.getElementById('submit').innerHTML = 'Submit';
            document.getElementById('submit').disabled = false;
          });
      });

      window.addEventListener('onChange', (event) => {
        const { type, complete } = event.detail;
        document.getElementById('submit').disabled = !complete;
      })
    </script>
  </body>
  <style>
    ${cssStyles}
  </style>
</html>
`;

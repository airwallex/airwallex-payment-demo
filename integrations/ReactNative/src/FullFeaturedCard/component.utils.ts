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
      <div id='full-featured-card'></div>
      <script>
        Airwallex.init({
          env: 'dev', // Setup which env('staging' | 'demo' | 'prod') you would like to integrate with
          origin: '*', // Setup your event target to receive the browser events message
        });
        
        const card = Airwallex.createElement('fullFeaturedCard', {
          intent: { 
            id: '${intent_id}',
            client_secret: '${client_secret}'
          }
        });
        card.mount('full-featured-card');
        document.getElementsByTagName('iframe')[0].style.height = 500;
      </script>
    </body>
    <style>
      ${cssStyles}
    </style>
  </html>
`;

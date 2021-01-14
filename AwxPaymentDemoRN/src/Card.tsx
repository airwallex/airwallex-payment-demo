import * as React from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';

const intent_id = 'replace-your-intent-id-here';
const client_secret = 'replace-your-client-secret-here';

const Card = () => {
  const html = `
  <html>
    <head lang='en'>
      <script src="https://checkout.airwallex.com/assets/bundle.x.x.x.min.js"></script>
    </head>
    <body>
      <label>
        Card Information
        <div id='card'></div>
        <div id='status'></div>
      </label>
      <br>
      <button id='submit'>Submit</button>
      <script>
        document.getElementById('card').innerHTML = 'hello';
        // Step #2: Initialize the Airwallex global context for event communication
        Airwallex.init({
          env: 'dev', // Setup which env('staging' | 'demo' | 'prod') you would like to integrate with
          //origin: 'https://checkout.airwallex.com', // Setup your event target to receive the browser events message
        });
        // Step #3: Create 'card' element
        const card = Airwallex.createElement('card');
        // Step #4: Mount card element
        card.mount('card');
        document.getElementsByTagName('iframe')[0].style.height = 50;
        document.getElementById('submit').addEventListener('click', () => {
          // Step #5: Confirm payment intent with id and client_secret
          Airwallex.confirmPaymentIntent({
            element: 'card',
            intent_id: ${intent_id},
            client_secret: ${client_secret},
          }).then((response) => {
            /* handle confirm response in your business flow */
            alert(JSON.stringify(response));
          });
        });
        document.addEventListener('onReady', (event) => {
          /*
            ... Handle event
          */
          // alert(event.detail)
        })
      </script>
    </body>
  </html>
  `;
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <Text>Card Integration</Text>
      <WebView source={{html}} />
    </View>
  );
};

export default Card;

import * as React from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';

const intent_id = 'replace-your-intent-id-here';
const client_secret = 'replace-your-client-secret-here';

const Hpp = () => {
  const html = `
  <html>
    <head lang='en'>
      <script src="https://checkout.airwallex.com/assets/bundle.0.2.5.min.js"></script>
    </head>
    <body>
      <button id='hpp'>Redirect to HPP</button>
      <script>
        document.getElementById('hpp').addEventListener('click', () => {
          // Step #2: Call the HPP function to checkout 
          Airwallex.redirectToCheckout({
            env: 'staging', // Which env('staging' | 'demo' | 'prod') you would like to integrate with
            id: ${intent_id},
            client_secret: ${client_secret}
          });
        })
      </script>
    </body>
  </html>
  `;
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <Text>Hpp Integration</Text>
      <WebView source={{html}} />
    </View>
  );
};

export default Hpp;

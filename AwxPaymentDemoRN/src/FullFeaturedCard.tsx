import * as React from 'react';
import {View, Text, Alert} from 'react-native';
import {WebView} from 'react-native-webview';

const intent_id = 'replace-your-intent-id-here';
const client_secret = 'replace-your-client-secret-here';

const FullFeaturedCard = () => {
  const html = `
  <html>
    <head lang='en'>
      <script src="https://checkout.airwallex.com/assets/bundle.x.x.x.min.js"></script>
    </head>
    <body>
      <div id='full-featured-card'></div>
      <script>
        window.name = 'react native webview';
        Airwallex.init({
          env: 'staging', // Setup which env('staging' | 'demo' | 'prod') you would like to integrate with
          origin: '*', // Setup your event target to receive the browser events message
        });
        const card = Airwallex.createElement('fullFeaturedCard', {
          intent: { 
            id: ${intent_id},
            client_secret: ${client_secret}
          }
        });
        card.mount('full-featured-card');
        document.getElementsByTagName('iframe')[0].style.height = 500;
      </script>
    </body>
  </html>
  `;
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <Text>Full Featured Card Integration</Text>
      <WebView
        originWhitelist={['*']}
        source={{html}}
        onMessage={(event) => {
          Alert.alert(event.nativeEvent.data);
        }}
      />
    </View>
  );
};

export default FullFeaturedCard;

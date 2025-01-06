/**
 * Hpp/index.tsx
 * Airwallex Payment Demo - React Native.  Created by Josie Ku.
 *
 * airwallex-payment-elements Hosted Payment Page integration in React Native
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/hpp.md
 */
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import {styles} from '../CommonStyles';
import {generateHTML} from './component.utils';

// Enter your Payment Intent secret keys here
// More on getting these secrets: https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro
const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

const Hpp = () => {
  const [error, setError] = useState(''); // Example: handles error states

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hosted Payment Page (HPP) Integration</Text>
      {error.length > 0 && ( // Example: show error message
        <Text style={{...styles.alertText, ...styles.error}}>{error}</Text>
      )}
      <WebView
        source={{html: generateHTML({intent_id, client_secret})}}
        containerStyle={styles.webview}
        onMessage={(event: WebViewMessageEvent) => {
          // onMessage is required to listen to events from Airwallex!
          const data = JSON.parse(event.nativeEvent.data); // Parse data from string

          // Handle events based on their codes
          if (data.code === 'onError' && data.type === 'hpp') {
            setError(data.error?.message || '');
            console.error('There was an error', data.error);
          }
        }}
      />
    </View>
  );
};

export default Hpp;

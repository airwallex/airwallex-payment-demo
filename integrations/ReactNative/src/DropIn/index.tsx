/**
 * DropIn/index.tsx
 * Airwallex Payment Demo - React Native.  Created by Josie Ku.
 *
 * airwallex-payment-elements DropIn element integration in React Native
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.  The first part of the integration
 * is done in the adjacent `component.utils.ts` file. This file demonstrates
 * how ReactNativeWebview can be used to integrate with Airwallex to handle
 * event responses.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/dropin.md
 */
import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import {styles} from '../CommonStyles';
import {generateHTML} from './component.utils';

// Enter your Payment Intent secret keys here
// More on getting these secrets: https://www.airwallex.com/docs/api#/Payment_Acceptance/Payment_Intents/Intro
const intent_id = 'replace-with-your-intent-id';
const client_secret = 'replace-with-your-client-secret';

const DropIn = () => {
  const [error, setError] = useState(''); // Example: handles error states
  const [success, setSuccess] = useState(false); // Example: handles success states
  const [elementShow, setElementShow] = useState(false); // Example: handles element on mount state

  // Styling example below: show container only when element is mounted/ready
  const dynamicContainer = {display: elementShow && !success ? 'flex' : 'none'};
  const containerStyle = {
    ...styles.webview,
    ...dynamicContainer,
  } as StyleProp<ViewStyle>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drop In Element Integration</Text>
      {
        !elementShow && <ActivityIndicator /> // Example: show load state
      }
      {error.length > 0 && ( // Example: show error message
        <Text style={{...styles.alertText, ...styles.error}}>{error}</Text>
      )}
      {success && ( // Example: show success message
        <Text style={{...styles.alertText, ...styles.success}}>
          Payment Successful
        </Text>
      )}
      <WebView
        source={{html: generateHTML({intent_id, client_secret})}}
        containerStyle={containerStyle}
        onMessage={(event: WebViewMessageEvent) => {
          // onMessage is required to listen to events from Airwallex!
          const data = JSON.parse(event.nativeEvent.data); // Parse data from string

          // Handle events based on their codes
          if (data.code === 'onReady' && data.type === 'dropIn') {
            setError(''); // Example: reset error state
            setElementShow(true); // Example: show element when mounted
            console.log('Element is ready');
          }
          if (data.code === 'onSuccess' && !success) {
            setError(''); // Example: reset error state
            setSuccess(true); // Example: show success message
            Alert.alert('Payment success!');
          }
          if (data.code === 'onError') {
            setError(data.error?.message || ''); // Example: set and show error message
            console.error('There was an error', data.error);
          }
        }}
      />
    </View>
  );
};

export default DropIn;

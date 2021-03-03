/**
 * SplitCard/index.tsx
 * Airwallex Payment Demo - React Native.  Created by Josie Ku.
 *
 * airwallex-payment-elements SplitCard element integration in React Native
 * Comments with "Example" demonstrate how states can be integrated
 * with the element, they can be removed.  The first part of the integration
 * is done in the adjacent `component.utils.ts` file. This file demonstrates
 * how ReactNativeWebview can be used to integrate with Airwallex to handle
 * event responses.
 *
 * Detailed guidance here: https://github.com/airwallex/airwallex-payment-demo/blob/master/docs/splitcard.md
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

const SplitCard = () => {
  const elements = ['cardNumber', 'cvc', 'expiry'];
  // Example: element ready states, controls the display for when elements are successfully mounted
  const [cardNumberReady, setCardNumberReady] = useState<boolean>(false);
  const [cvcReady, setCvcReady] = useState<boolean>(false);
  const [expiryReady, setExpiryReady] = useState<boolean>(false);
  // Example: set success state
  const [isSuccess, setIsSuccess] = useState(false);
  // Example: set error state
  const [errorMessage, setErrorMessage] = useState('');

  const elementShow = cardNumberReady && cvcReady && expiryReady;

  // Styling example below: show container only when element is mounted/ready
  const dynamicContainer = {
    display: elementShow && !isSuccess ? 'flex' : 'none',
  };
  const containerStyle = {
    ...styles.webview,
    ...dynamicContainer,
  } as StyleProp<ViewStyle>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Split Card Element Integration</Text>
      {
        !elementShow && <ActivityIndicator /> // Example: show load state
      }
      {errorMessage.length > 0 && ( // Example: show error message
        <Text style={{...styles.alertText, ...styles.error}}>
          {errorMessage}
        </Text>
      )}
      {isSuccess && ( // Example: show success message
        <Text style={{...styles.alertText, ...styles.success}}>
          Payment Successful
        </Text>
      )}
      <WebView
        source={{html: generateHTML({intent_id, client_secret})}}
        bounces={false}
        scrollEnabled={false}
        containerStyle={containerStyle}
        onMessage={(event: WebViewMessageEvent) => {
          // onMessage is required to listen to events from Airwallex!
          const data = JSON.parse(event.nativeEvent.data); // Parse data from string

          // Handle events based on their codes
          if (data.code === 'onReady' && elements.includes(data.type)) {
            setErrorMessage(''); // Example: reset error state
            if (data.type === 'cardNumber') {
              setCardNumberReady(true);
            } else if (data.type === 'expiry') {
              setExpiryReady(true);
            } else if (data.type === 'cvc') {
              setCvcReady(true);
            }
          }
          if (data.code === 'onSuccess') {
            setErrorMessage(''); // Example: reset error state
            setIsSuccess(true); // Example: show success message
            Alert.alert('Payment success!');
          }
          if (data.code === 'onError') {
            setErrorMessage(data.error?.message || ''); // Example: set and show error message
            console.error('There was an error', data.error);
          }
        }}
      />
    </View>
  );
};

export default SplitCard;

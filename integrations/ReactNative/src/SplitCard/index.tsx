import React, {useState} from 'react';
import {View, Text, Alert, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import {styles} from '../CommonStyles';
import {html} from './component.utils';

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
  const dynamicContainer = {
    display: elementShow && !isSuccess ? 'flex' : 'none',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Split Card Element Integration</Text>
      {!elementShow && <ActivityIndicator />}
      {errorMessage.length > 0 && (
        <Text style={{...styles.alertText, ...styles.error}}>
          {errorMessage}
        </Text>
      )}
      {isSuccess && (
        <Text style={{...styles.alertText, ...styles.success}}>
          Payment Successful
        </Text>
      )}
      <WebView
        originWhitelist={['*']}
        source={{html}}
        bounces={false}
        scrollEnabled={false}
        containerStyle={{...styles.webview, ...dynamicContainer} as any}
        onMessage={(event: any) => {
          const data = JSON.parse(event.nativeEvent.data);
          if (data.code === 'onReady' && elements.includes(data.type)) {
            setErrorMessage('');
            if (data.type === 'cardNumber') {
              setCardNumberReady(true);
            } else if (data.type === 'expiry') {
              setExpiryReady(true);
            } else if (data.type === 'cvc') {
              setCvcReady(true);
            }
          }
          if (data.code === 'onSuccess') {
            setErrorMessage('');
            setIsSuccess(true);
            Alert.alert('Payment success!');
          }
          if (data.code === 'onError' && data.type === 'cardNumber') {
            setErrorMessage(data.error?.message || '');
            console.error('There was an error', data.error);
          }
        }}
      />
    </View>
  );
};

export default SplitCard;

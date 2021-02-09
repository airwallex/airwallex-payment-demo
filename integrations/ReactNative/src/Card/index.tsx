import React, {useState} from 'react';
import {View, Text, Alert, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import {styles} from '../CommonStyles';
import {html} from './component.utils';

const Card = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [elementShow, setElementShow] = useState(false);

  const dynamicContainer = {display: elementShow && !success ? 'flex' : 'none'};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Card Element Integration</Text>
      {!elementShow && <ActivityIndicator />}
      {error.length > 0 && (
        <Text style={{...styles.alertText, ...styles.error}}>{error}</Text>
      )}
      {success && (
        <Text style={{...styles.alertText, ...styles.success}}>
          Payment Successful
        </Text>
      )}
      <WebView
        originWhitelist={['*']}
        source={{html}}
        containerStyle={{...styles.webview, ...dynamicContainer} as any}
        onMessage={(event: any) => {
          const data = JSON.parse(event.nativeEvent.data);
          if (data.code === 'onReady' && data.type === 'card') {
            setError('');
            setElementShow(true);
            console.log('Element is ready');
          }
          if (data.code === 'onSuccess') {
            setError('');
            setSuccess(true);
            Alert.alert('Payment success!');
          }
          if (data.code === 'onError' && data.type === 'card') {
            setError(data.error?.message || '');
            console.error('There was an error', data.error);
          }
        }}
      />
    </View>
  );
};

export default Card;

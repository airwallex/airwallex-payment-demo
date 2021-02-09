import React, {useState} from 'react';
import {View, Text, Alert, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import {styles} from '../CommonStyles';
import {html} from './component.utils';

const DropIn = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [elementShow, setElementShow] = useState(false);

  const dynamicContainer = {display: elementShow && !success ? 'flex' : 'none'};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drop In Element Integration</Text>
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
          if (data.code === 'onReady' && data.type === 'dropIn') {
            setError('');
            setElementShow(true);
            console.log('Element is ready');
          }
          if (data.code === 'onSuccess') {
            setError('');
            setSuccess(true);
            Alert.alert('Payment success!');
          }
          if (data.code === 'onError' && data.type === 'dropIn') {
            setError(data.error?.message || '');
            console.error('There was an error', data.error);
          }
        }}
      />
    </View>
  );
};

export default DropIn;

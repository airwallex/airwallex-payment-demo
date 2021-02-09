import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import {styles} from '../CommonStyles';
import {html} from './component.utils';

const Hpp = () => {
  const [error, setError] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hosted Payment Page (HPP) Integration</Text>
      {error.length > 0 && (
        <Text style={{...styles.alertText, ...styles.error}}>{error}</Text>
      )}
      <WebView
        originWhitelist={['*']}
        source={{html}}
        containerStyle={styles.webview}
        onMessage={(event: any) => {
          const data = JSON.parse(event.nativeEvent.data);
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

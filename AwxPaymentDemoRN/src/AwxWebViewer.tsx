import * as React from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';


const AwxWebViewer = ({ route }) => {
  return (
    <View style={{ flex: 1, flexDirection: 'column'}}>
      <Text>{route.params.method.toUpperCase()} Integration</Text>
      <WebView
        source={{ uri: `http://localhost:5000/${route.params.method}` }}
      />
    </View>
  );
};

export default AwxWebViewer;
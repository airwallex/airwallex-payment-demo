import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  StatusBar,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import { loadAirwallex, redirectToCheckout } from 'airwallex-payment-elements'

const DropIn = ({ navigation }) => {

  const redirectHpp = async () => {
    try {
      await loadAirwallex({
        env: "staging",
      });
      await redirectToCheckout({
        env: "staging",
        id: intentid,
        client_secret: client_secret,
      });
    } catch (error) {
      console.error('error', error)
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.body}>
          <Button
            onPress={redirectHpp}
            title="Redirect to Hpp"
            color="#841584"
            accessibilityLabel="Redirect to Hpp"
          />
          <Button
            title="Go to Hpp"
            onPress={() => navigation.navigate('Hpp')}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  }
});

export default DropIn;

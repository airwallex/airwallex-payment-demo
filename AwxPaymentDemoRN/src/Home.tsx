import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const methods: [string] = [
  'hpp',
  'card',
  'dropin',
  'full-featured-card',
  'split-card',
  'wechat',
];

const Home = ({navigation}) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Payment Methods</Text>
              {methods.map((method, idx) => (
                <TouchableHighlight
                  key={`touchable_${idx}`}
                  onPress={() => navigation.navigate('Webviewer', {method})}>
                  <Text>{method.toUpperCase()}</Text>
                </TouchableHighlight>
              ))}
              <TouchableHighlight onPress={() => navigation.navigate('Card')}>
                <Text>card</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => navigation.navigate('Hpp')}>
                <Text>hpp</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => navigation.navigate('FullFeaturedCard')}>
                <Text>full featured card</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default Home;

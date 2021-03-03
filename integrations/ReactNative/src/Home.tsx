import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import {styles} from './CommonStyles';

interface Props {
  navigation: any;
}

const HomeScreen = ({navigation}: Props) => {
  const MenuButton = ({route, title}: {route: string; title: string}) => (
    <TouchableHighlight
      style={styles.menuButton}
      onPress={() => navigation.navigate(route)}>
      <Text>{title}</Text>
    </TouchableHighlight>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <View>
              <Text style={styles.title}>
                Airwallex Payment Demo - {'\n'}React Native
              </Text>
              <MenuButton title="Card" route="Card" />
              <MenuButton title="Hosted Payment Page (HPP)" route="Hpp" />
              <MenuButton title="Full Featured Card" route="FullFeaturedCard" />
              <MenuButton title="Drop In" route="DropIn" />
              <MenuButton title="Split Card" route="SplitCard" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

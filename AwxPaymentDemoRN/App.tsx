import * as React from 'react';
import { View, Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StaticServer from 'react-native-static-server';

import HomeScreen from './src/Home';
import Card from './src/Card';
import Hpp from './src/Hpp';
import FullFeaturedCard from './src/FullFeaturedCard';
import AwxWebViewer from './src/AwxWebViewer';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Webviewer" component={AwxWebViewer} />
        <Stack.Screen name="Card" component={Card} />
        <Stack.Screen name="Hpp" component={Hpp} />
        <Stack.Screen name="FullFeaturedCard" component={FullFeaturedCard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

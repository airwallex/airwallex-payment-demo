import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './src/Home';
import FullFeaturedCard from './src/FullFeaturedCard';
import Card from './src/Card';
import DropIn from './src/DropIn';
import Hpp from './src/Hpp';
import SplitCard from './src/SplitCard';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="FullFeaturedCard"
          component={FullFeaturedCard}
          options={{title: 'Full Featured Card'}}
        />
        <Stack.Screen name="Card" component={Card} />
        <Stack.Screen
          name="DropIn"
          component={DropIn}
          options={{title: 'Drop In'}}
        />
        <Stack.Screen
          name="Hpp"
          component={Hpp}
          options={{title: 'Hosted Payment Page (HPP)'}}
        />
        <Stack.Screen
          name="SplitCard"
          component={SplitCard}
          options={{title: 'Split Card'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

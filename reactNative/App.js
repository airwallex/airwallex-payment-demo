import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DropIn from './views/dropIn';
import Hpp from './views/hpp';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Hpp" component={Hpp} />
        <Stack.Screen name="DropIn" component={DropIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App

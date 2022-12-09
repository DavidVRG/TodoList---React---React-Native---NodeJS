import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import AddScreen from './Screens/AddScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import UpdateScreen from './Screens/UpdateScreen';
import { StatusBar } from 'react-native';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#003f88" />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Todo List',
            headerStyle: {
              backgroundColor: '#003f88',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }} />
        <Stack.Screen
          name="Add"
          component={AddScreen}
          options={{
            title: 'Todo List',
            headerStyle: {
              backgroundColor: '#003f88',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Todo List',
            headerStyle: {
              backgroundColor: '#003f88',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }} />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: 'Todo List',
            headerStyle: {
              backgroundColor: '#003f88',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }} />
        <Stack.Screen
          name="Update"
          component={UpdateScreen}
          options={{
            title: 'Todo List',
            headerStyle: {
              backgroundColor: '#003f88',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  )
}
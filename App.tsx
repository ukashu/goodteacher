import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { AuthProvider, useAuth } from './app/context/AuthContext';
import Home from './app/screens/Home';
import Login from './app/screens/Login';
import Register from './app/screens/Register';

export type RootStackParamList = {
  Home: undefined,
  Login: undefined,
  Register: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {

  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth()

  return (
  <NavigationContainer>
    <Stack.Navigator>
      {authState?.authenticated ? (
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{
            headerRight: () => <Button onPress={onLogout} title="Sign Out"/>
          }}></Stack.Screen>
        ) : (
          <>
            <Stack.Screen 
            name="Login" 
            component={Login}
            options={({navigation}) => ({
              headerRight: () => <Button onPress={() => navigation.navigate('Register')} title="Register"/>
            })}
            ></Stack.Screen>
            <Stack.Screen 
            name="Register" 
            component={Register}
            options={({navigation}) => ({
              headerBackVisible: false,
              headerRight: () => <Button onPress={() => navigation.navigate('Login')} title="Sign In"/>
            })}
            ></Stack.Screen>
          </>
      )
    }
    </Stack.Navigator>
  </NavigationContainer>)
}
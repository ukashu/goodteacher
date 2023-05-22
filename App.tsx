import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './app/context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import Classes from './app/screens/Classes';
import Students from './app/screens/Students';
import Tasks from './app/screens/Tasks'

export type RootStackParamList = {
  Home: undefined,
  Login: undefined,
  Register: undefined,
  Classes: undefined,
  Students: undefined,
  Tasks: undefined
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
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      {authState?.authenticated ? (
        <>
          <Stack.Screen 
            name="Classes" 
            component={Classes}
          ></Stack.Screen>
          <Stack.Screen 
            name="Students" 
            component={Students}
          ></Stack.Screen>
          <Stack.Screen 
            name="Tasks" 
            component={Tasks}
          ></Stack.Screen>
        </>
        ) : (
          <>
            <Stack.Screen 
            name="Login" 
            component={Login}
            ></Stack.Screen>
            <Stack.Screen 
            name="Register" 
            component={Register}
            ></Stack.Screen>
          </>
      )
    }
    </Stack.Navigator>
  </NavigationContainer>)
}
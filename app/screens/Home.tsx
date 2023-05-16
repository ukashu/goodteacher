import { View, Text, Button } from 'react-native';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type LogoutNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LogoutNavigationProp;
};

export default function Home({ navigation }: Props) {
  const { authState, onLogout } = useAuth()

  return (
    <View>
      <Text>Home</Text>
      <Button onPress={onLogout} title="Sign Out"/>
    </View>
  )
}
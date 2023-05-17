import { View, Text, Button } from 'react-native';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type ClassesNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Classes'
>;

type Props = {
  navigation: ClassesNavigationProp;
};

export default function Classes({ navigation }: Props) {
  const { authState, onLogout } = useAuth()

  return (
    <View>
      <Text>Classes</Text>
      <Button onPress={onLogout} title="Sign Out"/>
      <Button onPress={() => navigation.navigate('Students')} title="Go to students"/>
    </View>
  )
}
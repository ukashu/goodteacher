import { View, Text, Button } from 'react-native';
import React from 'react';
import { StackActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type StudentsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Students'
>;

type Props = {
  navigation: StudentsNavigationProp;
};

export default function Students({ navigation }: Props) {
  return (
    <View>
      <Text>Tasks</Text>
      <Button onPress={() => navigation.navigate('Tasks')} title="Go to tasks"/>
      <Button onPress={() => navigation.dispatch(StackActions.pop(1))} title="go back"/>
    </View>
  )
}
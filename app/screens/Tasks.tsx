import { View, Text, Button } from 'react-native';
import React from 'react';
import { StackActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type TasksNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Tasks'
>;

type Props = {
  navigation: TasksNavigationProp;
}

export default function Tasks({ navigation }: Props) {
  return (
    <View>
      <Text>Tasks</Text>
      <Button onPress={() => navigation.dispatch(StackActions.pop(1))} title="go back"/>
    </View>
  )
}
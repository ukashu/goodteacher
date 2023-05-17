import { View, Text, Button } from 'react-native';
import { Dimensions } from 'react-native';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackActions } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import tw from 'twrnc';
import Background from '../../assets/background.svg';
import CustomButton from '../components/CustomButton';
import BackButton from '../components/BackButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Class from '../components/Class';

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
    <View style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    }}>
      <SafeAreaView>
        <Background width="100%" height="110%" preserveAspectRatio="none" style={tw`absolute z-1`}/>
        <View style={tw`z-2 items-center m-auto h-100% w-100%`}>
          <View style={tw` w-100% px-2 flex-row justify-between items-center`}>
            <BackButton onPress={() => navigation.dispatch(StackActions.pop(1))}/>
            <CustomButton onPress={onLogout} title="Log out" style={tw`px-4 py-2 flex-grow-0 rounded-lg bg-blue-500`}/>
          </View>
          <Text style={tw` text-4xl text-blue-600`}>Your classes</Text> 
          <View style={tw` w-100% `}>
            <Class/>
            <Class/>
          </View>
          <View style={tw` bg-red-800 mt-auto`}>
            <Button onPress={() => navigation.navigate('Students')} title="Go to students"/>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}
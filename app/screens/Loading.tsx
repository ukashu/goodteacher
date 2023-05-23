import { View, Text, ActivityIndicator } from 'react-native';
import { Dimensions } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Background from '../../assets/background.svg';

export default function Loading() {
  return (
    <View style={{
      position: 'absolute',
      left: 0,
      top: 0,
      display: 'flex',
      justifyContent: 'center',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    }}>
      <Background width="100%" height="110%" preserveAspectRatio="none" style={tw`absolute z-1`}/>
      <ActivityIndicator size="large" color="red" style={tw`absolute z-2 self-center justify-around my-auto`}/>
    </View>
  )
}
import { View, Text } from 'react-native';
import React from 'react';
import tw from 'twrnc';

export default function ClassAvatar() {
  return (
    <View style={tw`bg-slate-300 rounded-md h-100% aspect-square`}>
      <Text >Class avatar</Text>
    </View>
  )
}
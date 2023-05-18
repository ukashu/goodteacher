import { View, Text } from 'react-native';
import React from 'react';
import tw from 'twrnc';

export default function Loading() {
  return (
    <View style={tw` h-100% bg-red-600`}>
      <Text>Loading...</Text>
    </View>
  )
}
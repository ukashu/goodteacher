import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Shadow } from 'react-native-shadow-2';

// style={tw`h-34 mx-2 mb-2 rounded-lg`}

export default function Class() {
  return (
    <View style={tw`h-34 mx-3 mb-3 bg-blue-500 rounded-lg`}>
      <Shadow startColor='rgba(255, 0, 0, 0.82)' offset={[0,2]} paintInside={false} distance={4} style={tw` w-100% rounded-lg h-100%`}>
      <Shadow startColor='rgba(255, 0, 0, 0.82)' offset={[0,0]} paintInside={false} distance={5} sides={{start: true, end: true, top: true, bottom: false}} corners={{topStart: true, topEnd: true, bottomStart: false, bottomEnd: false}} style={tw` w-100% rounded-lg h-100%`}>
          <TouchableOpacity style={tw` w-100% rounded-lg h-100%`}>
            <Text>Class</Text>
          </TouchableOpacity>
      </Shadow>
      </Shadow>
    </View>
  )
}
import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import React from 'react';
import tw from 'twrnc';

// style={tw`h-34 mx-2 mb-2 rounded-lg`}

export default function Class() {
  return (
    <View style={tw`px-3`}>
      <View style={tw`absolute z-3 h-34 ml-3 mt-2 w-100% bg-blue-500 rounded-lg`}>
        <TouchableOpacity style={tw` w-100% rounded-lg h-100%`}>
          {/* all items inside of here */}
          <Text>Class</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`relative z-2 h-34 ml-1 mt-4 w-100% bg-red-600 rounded-lg`}></View>
    </View>
  )
}
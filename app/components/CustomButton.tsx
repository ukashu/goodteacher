import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import React from 'react';
import tw from 'twrnc';


export default function CustomButton(props: TouchableOpacityProps & { title: string }) {
  return (
    <TouchableOpacity {...props}>
      <Text style={tw`text-white text-center`}>{props.title}</Text>
    </TouchableOpacity>
  )
}
import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import React from 'react';
import tw from 'twrnc';

export default function CustomButton(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity style={tw`px-4 py-2 rounded-lg bg-blue-500`} {...props}></TouchableOpacity>
  )
}
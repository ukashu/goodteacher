import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons'; 

export default function BackButton(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity {...props}>
      <Ionicons name="arrow-back" size={40} color="red" />
    </TouchableOpacity>
  )
}
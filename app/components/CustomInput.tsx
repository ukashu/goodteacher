import { View, Text, TextInput, TextInputProps } from 'react-native';
import React from 'react';
import tw from 'twrnc';

export default function CustomInput(props: TextInputProps) {
  const { ...rest } = props

  return (
    <View style={tw`border-b border-gray-500 my-0 px-8 w-100% items-center`}>
      <TextInput style={tw`text-center`} {...rest}/>
    </View>
  )
}
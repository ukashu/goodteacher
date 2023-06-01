import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { AntDesign } from '@expo/vector-icons';

export default function Checkbox(props: { state: boolean,onPress: () => void }) {

  return (
    props.state ?
    <TouchableOpacity style={tw`w-8 h-8 rounded-lg bg-slate-200`} onPress={props.onPress}>
      <AntDesign name="check" size={33} color="#ff0000" />
    </TouchableOpacity>
    :
    <TouchableOpacity style={tw`w-8 h-8 rounded-lg bg-slate-200`} onPress={() => props.onPress()}></TouchableOpacity>
  )
}
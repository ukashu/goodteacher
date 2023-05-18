import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import ClassAvatar from './ClassAvatar';
import React from 'react';
import tw from 'twrnc';

// style={tw`h-34 mx-2 mb-2 rounded-lg`}

type ClassProps = {
  onPress?: TouchableOpacityProps['onPress'],
  className: string,
  memberCount: number,
  classId?: number,
}

export default function Class(props : ClassProps) {
  return (
    <View style={tw`px-3`}>
      <View style={tw`absolute z-3 h-34 ml-3 mt-2 w-100% bg-blue-500 rounded-lg`}>
        <TouchableOpacity style={tw` w-100% rounded-lg h-100% flex-row p-3 justify-between`}>
          {/* all items inside of here */}
          <View style={tw``}>
            <Text style={tw`text-xl text-white`}>{props.className}</Text>
            <Text style={tw` text-base text-white`}>{`members: ${props.memberCount}`}</Text>
          </View>
          <View style={tw`bg-white rounded-md h-100% aspect-square`}>
            <ClassAvatar/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={tw`relative z-2 h-34 ml-1 mt-4 w-100% bg-red-600 rounded-lg`}></View>
    </View>
  )
}
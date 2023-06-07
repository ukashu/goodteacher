import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from '../../lib/tailwind';
import { BlurView } from 'expo-blur';
import StudentAvatarSvg from './svg/StudentAvatarSvg'
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import CustomButton from './CustomButton';

type Props = {
  name: string,
  hideDrawerModal: () => void,
  logout: any
}

export default function DrawerModal(props: Props) {
  return (
    <BlurView intensity={80} style={tw`absolute w-100% h-110% z-0 m-0 items-end`}>
      <View style={tw` h-90% w-80% mt-8 bg-custom-blue-dark p-2 gap-2 rounded-l-xl shadow-xl`}>
        <View style={tw`w-100% h-20 flex-row items-center`}>
          <View style={tw` h-100% w-20`}>
            <StudentAvatarSvg studentAlias={props.name}/>
          </View>
          <Text style={tw` text-xl text-custom-blue-light ml-2`}>{props.name}</Text>
          <TouchableOpacity onPress={props.hideDrawerModal} style={tw` ml-auto`}>
            <Entypo name="menu" size={40} color="#99D4FF"/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={tw` w-100% h-20 py-1 flex-row items-center`}>
          <View style={tw` h-100% w-20 items-center justify-center`}>
            <Entypo name="bug" size={30} color="#99D4FF"/>
          </View>
          <Text style={tw` text-base text-custom-blue-light`}>report bug</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw` w-100% h-20 py-1 flex-row items-center`}>
          <View style={tw` h-100% w-20 items-center justify-center`}>
            <MaterialIcons name="visibility" size={30} color="#99D4FF"/>
          </View>
          <Text style={tw` text-base text-custom-blue-light`}>visible to invites</Text>
        </TouchableOpacity>
        <View style={tw` w-100% px-2 flex-row justify-end items-center mt-auto mb-10`}>
          <CustomButton onPress={props.logout} title="Log out" style={tw`px-4 py-2 flex-grow-0 mt-2 mr-2 rounded-lg bg-blue-600`}/>
        </View>
      </View>
    </BlurView>
  )
}


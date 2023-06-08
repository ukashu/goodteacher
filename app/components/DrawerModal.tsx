import { View, Text, TouchableOpacity, Animated } from 'react-native'
import React from 'react'
import tw from '../../lib/tailwind';
import { BlurView } from 'expo-blur';
import StudentAvatarSvg from './svg/StudentAvatarSvg'
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import CustomButton from './CustomButton';
import DrawerBackgroundSvg from './svg/DrawerBackgroundSvg'

type Props = {
  name: string,
  hideDrawerModal: () => void,
  logout: any
}

export default function DrawerModal(props: Props) {
  React.useEffect(() => {
    slideIn()
  }, [])

  const slideAnim = React.useRef(new Animated.Value(500)).current;

  const slideIn = () => {
    // Will change fadeAnim value to 1 in 300 ms
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const slideOut = () => {
    // Will change fadeAnim value to 0 in 100 ms
    Animated.timing(slideAnim, {
      toValue: 500,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  return (
    <BlurView intensity={80} style={tw`absolute w-100% h-110% z-0 m-0`}>
      <Animated.View style={{width: "100%", height: "100%", marginLeft: slideAnim}}>
      <View style={tw` h-100% w-80% self-end ml-50 mt-8 bg-custom-blue-dark gap-2 rounded-l-xl shadow-xl`}>
        <DrawerBackgroundSvg width="100%" height="100%" preserveAspectRatio='none' style={tw`absolute block z-0`}/>
        <View style={tw`w-100% h-20 flex-row items-center p-2 my-2`}>
          <View style={tw` h-100% w-20 aspect-square`}>
            <StudentAvatarSvg studentAlias={props.name}/>
          </View>
          <Text style={tw` text-xl text-custom-blue-light ml-2`}>{props.name}</Text>
          <TouchableOpacity onPress={props.hideDrawerModal} style={tw` ml-auto`}>
            <Entypo name="menu" size={40} color="#99D4FF"/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={tw` w-100% h-20 py-1 flex-row items-center px-2`}>
          <View style={tw` h-100% w-20 items-center justify-center`}>
            <Entypo name="bug" size={30} color="#99D4FF"/>
          </View>
          <Text style={tw` text-base text-custom-blue-light`}>report bug</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw` w-100% h-20 py-1 flex-row items-center px-2`}>
          <View style={tw` h-100% w-20 items-center justify-center`}>
            <MaterialIcons name="visibility" size={30} color="#99D4FF"/>
          </View>
          <Text style={tw` text-base text-custom-blue-light`}>visible to invites</Text>
        </TouchableOpacity>
        <View style={tw` w-100% px-2 flex-row justify-end items-center mt-auto mb-30`}>
          <CustomButton onPress={props.logout} title="Log out" style={tw`px-4 py-2 flex-grow-0 mt-2 mr-2 rounded-lg bg-blue-600`}/>
        </View>
      </View>
      </Animated.View>
    </BlurView>
  )
}


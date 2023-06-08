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
      <View style={tw` h-100% w-80% self-end ml-50 bg-custom-blue-dark gap-2 shadow-2xl`}>
        <DrawerBackgroundSvg width="100%" height="100%" preserveAspectRatio='none' style={tw`absolute z-0`}/>
        <View style={tw`w-100% h-20 flex-row items-center p-2 mb-2 mt-10`}>
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
          <Text style={tw` text-base text-custom-blue-light`}>Report bug</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw` w-100% h-20 py-1 flex-row items-center px-2`}>
          <View style={tw` h-100% w-20 items-center justify-center`}>
            <MaterialIcons name="visibility" size={30} color="#99D4FF"/>
          </View>
          <Text style={tw` text-base text-custom-blue-light`}>Visible to invites</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.logout} style={tw` w-100% h-20 py-1 flex-row items-center px-2`}>
          <View style={tw` h-100% w-20 items-center justify-center`}>
            <Entypo name="log-out" size={30} color="#99D4FF"/>
          </View>
          <Text style={tw` text-base text-custom-blue-light`}>Log out</Text>
        </TouchableOpacity>
      </View>
      </Animated.View>
    </BlurView>
  )
}


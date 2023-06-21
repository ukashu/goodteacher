import { View, Text, TouchableOpacity, Animated } from 'react-native';
import React from 'react';
import tw from '../../lib/tailwind';
import { Entypo } from '@expo/vector-icons'; 
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import ClassAvatar from './ClassAvatar';
import { API_URL } from '../context/AuthContext';
import axios from 'axios'
import z from 'zod'
import * as schema from '../utils/schemas'
import AddModalBackgroundSvg from './svg/AddModalBackgroundSvg'
import { useTranslation } from "react-i18next";

type AddModalProps = {
  title: string,
  resource: "class" | "student" | "task",
  name: string,
  shortInputs: Array<string>,
  requestRoute: string,
  forceRerender: () => void,
  setShowModal: () => void
}

interface LooseObject {
  [key: string]: string
}

export default function AddModal(props: AddModalProps) {
  const { t } = useTranslation();

  const [inputs, setInputs] = React.useState<LooseObject>(() => {
    let temp: LooseObject = {}
    props.shortInputs.forEach((item) => {
      temp[item] = ''
    })
    return temp
  })

  const handleInputChange = (text: string, name: string) => {
    setInputs((prevState) => {
      return {
        ...prevState,
        [name]: text
      }
    })
  }

  const createResource = async () => {
    try {
      schema[`${props.resource}Schema`].parse(inputs)

      const res = await axios.post(`${API_URL}${props.requestRoute}`, inputs)
      props.setShowModal()
      props.forceRerender()
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        alert(error.issues[0].message)
      } else if (error.response != undefined && error.response.data.message) {
        alert(error.response.data.message)
      } else {
        alert(`Error adding ${props.resource}, please try again later`)
      }
    }
  }

  //animation
  React.useEffect(() => {
    fadeIn()
  }, [])

  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 300 ms
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 100 ms
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={
        {
          // Bind opacity to animated value
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: fadeAnim,
        }}>
      <View style={tw`items-center p-10 justify-around my-auto`}>
        <View style={tw`h-auto w-100% justify-between bg-custom-red-light rounded-lg shadow-md`}>
          <AddModalBackgroundSvg width="100%" height="100%" preserveAspectRatio='none' style={tw`absolute z-0`}/>
          <View style={tw` p-2`}>
            <Text style={tw` absolute self-center text-white text-3xl text-center mt-3`}>{props.title}</Text>
            <View style={tw` flex-row justify-between mb-1`}>
              <TouchableOpacity onPress={props.setShowModal}>
                <Entypo name="chevron-left" size={40} color="#3083ff"/>
              </TouchableOpacity>  
            </View>
            <View style={tw`bg-white rounded-md w-25% self-end aspect-square`}>
              <ClassAvatar/>
            </View>
            <View style={tw` mx-5 mb-5`}>
              {props.shortInputs.map((item) => { return (<CustomInput onChangeText={(input: string) => handleInputChange(input, item)} multiline={item==="description"?true:false} placeholder={t(`addModal.${item}` as any) as any} key={item} style={tw`mt-5`} autoCapitalize='none'/>)})}
            </View>
            <View style={tw` `}>
              <CustomButton title={`${t("addModal.Add")}`} onPress={createResource} style={tw`px-4 py-2 self-center rounded-lg min-w-23 bg-custom-blue-dark`}/>
            </View>
          </View> 
        </View>
      </View>
    </Animated.View>
    )
}
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from '../../lib/tailwind';
import { Ionicons } from '@expo/vector-icons'; 
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import ClassAvatar from './ClassAvatar';
import { API_URL } from '../context/AuthContext';
import axios from 'axios'
import z from 'zod'
import * as schema from '../utils/schemas'

type AddModalProps = {
  title: string,
  resource: "class" | "student" | "task",
  shortInputs: Array<string>,
  requestRoute: string,
  forceRerender: () => void,
  setShowModal: () => void
}

interface LooseObject {
  [key: string]: string
}

export default function AddModal(props: AddModalProps) {
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
        return alert(error.issues[0].message)
      }
      if (error.response != undefined && error.response.data.message) {
        return alert(error.response.data.message)
      } else {
        alert(`Error adding ${props.resource}, please try again later`)
      }
    }
  }

  return (
      <View style={tw`items-center p-10 justify-around my-auto`}>
        <View style={tw`h-auto w-100% p-2 justify-between bg-custom-red-light rounded-lg shadow-md`}>
          <Text style={tw` absolute self-center text-white text-3xl text-center mt-3`}>{props.title}</Text>
          <View style={tw` flex-row justify-between mb-1`}>
            <TouchableOpacity onPress={props.setShowModal}>
              <Ionicons name="arrow-back" size={40} color="#3083ff"/>
            </TouchableOpacity>  
          </View>
          <View style={tw`bg-white rounded-md w-25% self-end aspect-square`}>
            <ClassAvatar/>
          </View>
          <View style={tw` mx-5 mb-5`}>
            {props.shortInputs.map((item) => { return (<CustomInput onChangeText={(input: string) => handleInputChange(input, item)} placeholder={item} key={item} style={tw`mt-5`} autoCapitalize='none'/>)})}
          </View>
          <View style={tw` `}>
            <CustomButton title={`Add ${props.resource}`} onPress={createResource} style={tw`px-4 py-2 self-center rounded-lg min-w-23 bg-custom-blue-dark`}/>
          </View>
        </View>
      </View>
    )
}
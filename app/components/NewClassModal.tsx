import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons'; 
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import ClassAvatar from './ClassAvatar';
import { API_URL } from '../context/AuthContext';
import axios from 'axios'

type AddModalProps = {
  title: string,
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

  const createClass = async () => {
    try {
      const res = await axios.post(`${API_URL}${props.requestRoute}`, inputs)
      console.log(res.data)
      props.setShowModal()
      props.forceRerender()
    } catch (error) {
      alert('Error creating class, please try again later')
      console.log(error)
    }
  }

  return (
      <View style={tw`items-center p-10 justify-around my-auto`}>
        <View style={tw`h-auto w-100% p-2 justify-between bg-red-500 rounded-lg`}>
          <Text style={tw` absolute self-center text-white text-3xl text-center mt-3`}>{props.title}</Text>
          <View style={tw` flex-row justify-between mb-1`}>
            <TouchableOpacity onPress={props.setShowModal}>
              <Ionicons name="arrow-back" size={40} color="blue"/>
            </TouchableOpacity>  
          </View>
          <View style={tw`bg-white rounded-md w-25% self-end aspect-square`}>
            <ClassAvatar/>
          </View>
          <View style={tw` mx-5 mb-5`}>
            {props.shortInputs.map((item) => { return (<CustomInput onChangeText={(input: string) => handleInputChange(input, item)} placeholder={item} key={item}/>)})}
          </View>
          <View style={tw` `}>
            <CustomButton title="Create class" onPress={createClass} style={tw`px-4 py-2 self-center rounded-lg min-w-23 bg-blue-500`}/>
          </View>
        </View>
      </View>
    )
}
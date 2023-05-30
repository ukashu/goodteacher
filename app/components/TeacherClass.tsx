import { View, Text, TouchableOpacity, TouchableOpacityProps, Alert } from 'react-native';
import ClassAvatar from './ClassAvatar';
import React from 'react';
import tw from 'twrnc';
import axios from 'axios';
import { API_URL } from '../context/AuthContext';
import ClassPattern from '../../assets/ClassPattern2.svg';

type TeacherClassProps = {
  classId: number,
  className: string,
  memberCount?: number,
  removeSelf: (classId: number) => void,
  goToStudents: () => void,
}

type TeacherClassState = {
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
  message: string | null,
}

export default function StudentClass(props : TeacherClassProps) {
  const [state, setState] = React.useState<TeacherClassState>({
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: null,
  })

  const createTwoButtonDeleteAlert = (classId: number) =>
    Alert.alert('Caution', 'You\'re about to delete a class: this is a permanent action', [
      {
        text: 'CANCEL',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'DELETE', onPress: () => deleteClass(classId)},
    ]
  );

  async function deleteClass(classId: number) {
    try {
      const res = await axios.delete(`${API_URL}/classes/${classId}`)
      props.removeSelf(classId)
      setState((prevState) => {
        return {
          ...prevState,
          isLoading: false,
          isError: false,
          isSuccess: true,
          message: res.data.message ? res.data.message : 'Success',
        }
      })
    } catch(err: any) {
      console.log(err)
      alert('Error deleting class, please try again later')
      setState((prevState) => {
        return {
          ...prevState,
          isError: true,
          isLoading: false,
          isSuccess: false,
          message: 'Generic error',
        }
      })
    }
  }

  return (
    <View style={tw`px-3`}>
      <View style={tw`absolute z-3 h-34 ml-3 mt-2 w-100% bg-blue-500 rounded-lg`}>
        <ClassPattern width="100%" height="100%" style={tw`absolute z-0`}/>
        <TouchableOpacity onPress={props.goToStudents} onLongPress={() => {createTwoButtonDeleteAlert(props.classId)}} style={tw` w-100% rounded-lg h-100% flex-row p-3 justify-between`}>
          <View style={tw``}>
            <Text style={tw`text-xl text-white`}>{props.className}</Text>
            <Text style={tw` text-base text-white`}>{`class id: ${props.classId}`}</Text>
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
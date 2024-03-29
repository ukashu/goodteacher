import { View, Text, TouchableOpacity, TouchableOpacityProps, Alert } from 'react-native';
import CustomButton from './CustomButton';
import React from 'react';
import tw from '../../lib/tailwind';
import axios from 'axios';
import { API_URL } from '../context/AuthContext';
import StudentAvatarSvg from './svg/StudentAvatarSvg' 

type StudentProps = {
  studentId: number,
  classId: number,
  studentAlias: string,
  joinedStatus: boolean,
  goToTasks: () => void,
  deleteSelf: (studentId: number) => void,
}

type StudentClassState = {
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
  message: string | null,
}

export default function Student(props : StudentProps) {
  const [state, setState] = React.useState<StudentClassState>({
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: null,
  })

  const createTwoButtonDeleteAlert = () =>
    Alert.alert('Caution', 'You\'re about to remove a student: this is a permanent action', [
      {
        text: 'CANCEL',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'DELETE', onPress: () => removeStudent(props.classId, props.studentId)},
    ]
  );

  //function to delete student from class
  async function removeStudent(classId: number, studentId: number) {
    try {
      const res = await axios.delete(`${API_URL}/classes/${classId}/students/${studentId}`)
      props.deleteSelf(studentId)
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
      alert('Error removing student, please try again later')
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
      <View style={tw`absolute z-3 h-34 ml-3 mt-2 w-100% bg-custom-blue-dark rounded-full`}>
        <TouchableOpacity onPress={props.goToTasks} onLongPress={() => {createTwoButtonDeleteAlert()}} style={tw` w-100% rounded-full h-100% flex-row p-3 justify-between`}>
          <View style={tw` ml-10`}>
            <Text style={tw`text-xl text-white`}>{props.studentAlias}</Text>
          </View>
          <View style={tw`bg-white rounded-full h-100% aspect-square`}>
            <StudentAvatarSvg studentAlias={props.studentAlias}/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={tw`relative z-2 h-34 ml-1 mt-4 w-100% bg-custom-red-light rounded-full`}></View>
    </View>
  )
}
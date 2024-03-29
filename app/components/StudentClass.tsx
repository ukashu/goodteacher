import { View, Text, TouchableOpacity, TouchableOpacityProps, Alert } from 'react-native';
import ClassAvatar from './ClassAvatar';
import CustomButton from './CustomButton';
import React from 'react';
import tw from '../../lib/tailwind';
import axios from 'axios';
import { API_URL } from '../context/AuthContext';
import { useTranslation } from "react-i18next";

type StudentClassProps = {
  classId: number,
  studentId: number,
  className: string,
  joinedStatus: boolean,
  goToTasks: () => void,
  removeSelf: (classId: number) => void,
  joinSelf: (classId: number) => void,
}

type StudentClassState = {
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
  message: string | null,
}

export default function StudentClass(props : StudentClassProps) {
  const { t } = useTranslation();
  
  const [state, setState] = React.useState<StudentClassState>({
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: null,
  })

  const createTwoButtonLeaveAlert = (classId: number, studentId: number) =>
    Alert.alert('Caution', 'You\'re about to leave a class: this is a permanent action', [
      {
        text: 'CANCEL',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'LEAVE', onPress: () => leaveClass(classId, studentId)},
    ]
  );
  
  async function joinClass(classId: number, studentId: number) {
    try {
      const res = await axios.put(`${API_URL}/classes/${classId}/students/${studentId}`)
      props.joinSelf(classId)
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
      alert('Error joining class, please try again later')
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
  
  async function leaveClass(classId: number, studentId: number) {
    props.removeSelf(classId)

    try {
      const res = await axios.delete(`${API_URL}/classes/${classId}/students/${studentId}`)
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
      alert('Error leaving class, please try again later')
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

  if (props.joinedStatus) {

    return (
      <View style={tw`px-3`}>
        <View style={tw`absolute z-3 h-34 ml-3 mt-2 w-100% bg-custom-blue-dark rounded-lg`}>
          <TouchableOpacity onPress={props.goToTasks} onLongPress={() => {createTwoButtonLeaveAlert(props.classId, props.studentId)}} style={tw` w-100% rounded-lg h-100% flex-row p-3 justify-between`}>
            <View style={tw``}>
              <Text style={tw`text-xl text-white`}>{props.className}</Text>
            </View>
            <View style={tw`bg-white rounded-md h-100% aspect-square`}>
              <ClassAvatar/>
            </View>
          </TouchableOpacity>
        </View>
        <View style={tw`relative z-2 h-34 ml-1 mt-4 w-100% bg-custom-red-light rounded-lg`}></View>
      </View>
    )
    } else {
      return (
        <View style={tw`px-3`}>
        <View style={tw`absolute z-3 h-34 ml-3 mt-2 w-100% bg-custom-red-light rounded-lg`}>
          <TouchableOpacity style={tw` w-100% rounded-lg h-100% flex-row p-3 justify-between`}>
            <View style={tw` `}>
              <Text style={tw`text-xl text-white`}>{`${t("studentClass.Invite to class")} ${props.className}`}</Text>
            </View>
            <View style={tw` rounded-md h-100% aspect-square items-end justify-around`}>
              <CustomButton onPress={() => {joinClass(props.classId, props.studentId)}} title={t("studentClass.Join Class")} style={tw`px-4 py-2 min-w-30 flex-grow-0 rounded-lg bg-custom-blue-dark`}/>
              <CustomButton onPress={() => {leaveClass(props.classId, props.studentId)}} title={t("studentClass.Leave Class")} style={tw`px-4 py-2 min-w-30 flex-grow-0 rounded-lg bg-custom-blue-dark`}/>
            </View>
          </TouchableOpacity>
        </View>
        <View style={tw`relative z-2 h-34 ml-1 mt-4 w-100% bg-custom-blue-dark rounded-lg`}></View>
      </View>
      )
  }
}
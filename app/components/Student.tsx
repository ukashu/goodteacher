import { View, Text, TouchableOpacity, TouchableOpacityProps, Alert } from 'react-native';
import CustomButton from './CustomButton';
import React from 'react';
import tw from 'twrnc';
import axios from 'axios';
import { API_URL } from '../context/AuthContext';

type StudentProps = {
  studentId: number,
  studentAlias: string,
  deleteSelf: (classId: number) => void,
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
    Alert.alert('Caution', 'You\'re about to delete a class: this is a permanent action', [
      {
        text: 'CANCEL',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'DELETE', onPress: () => console.log('delete studfent')},
    ]
  );

  function goToTasks() {
    console.log('go to tasks')
  }

  //function to delete student from class

  return (
    <View style={tw`px-3`}>
      <View style={tw`absolute z-3 h-34 ml-3 mt-2 w-100% bg-blue-500 rounded-full`}>
        <TouchableOpacity onLongPress={() => {createTwoButtonDeleteAlert()}} style={tw` w-100% rounded-full h-100% flex-row p-3 justify-between`}>
          <View style={tw` ml-10`}>
            <Text style={tw`text-xl text-white`}>{props.studentAlias}</Text>
            <Text style={tw` text-base text-white`}>{`student id:`}</Text>
          </View>
          <View style={tw`bg-white rounded-full h-100% aspect-square`}>
          </View>
        </TouchableOpacity>
      </View>
      <View style={tw`relative z-2 h-34 ml-1 mt-4 w-100% bg-red-600 rounded-full`}></View>
    </View>
  )
}
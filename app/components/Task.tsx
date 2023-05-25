import { View, Text, TouchableOpacity, Button, Alert } from 'react-native';
import React from 'react';
import axios from 'axios';
import { API_URL } from '../context/AuthContext';
import tw from 'twrnc';
import Checkbox from './Checkbox';
import { Entypo } from '@expo/vector-icons'; 

type TaskProps = {
  studentId: number,
  classId: number,
  title: string,
  description?: string,
  completed: boolean,
  id: number,
  deleteSelf: (taskId: number) => void,
}

type TaskState = {
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
  message: string | null,
}

export default function Task(props: TaskProps) {
  const [state, setState] = React.useState<TaskState>({
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: null,
  })
  const [completed, setCompleted] = React.useState<boolean>(props.completed)
  const [showMore, setShowMore] = React.useState<boolean>(false)

  const createTwoButtonDeleteAlert = () =>
    Alert.alert('Caution', 'You\'re about to remove a task: this is a permanent action', [
      {
        text: 'CANCEL',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'DELETE', onPress: () => deleteTask(props.classId, props.studentId, props.id)},
    ]
  );

  async function changeTasksCompleteState(classId: number, studentId: number, taskId: number) {
    try {
      const res = await axios.put(`${API_URL}/classes/${classId}/students/${studentId}/tasks/${taskId}`, {completed: !completed})
      setCompleted(prevState => !prevState)
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
      console.log(err.response.data)
      alert('Error updating task, please try again later')
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

  async function deleteTask(classId: number, studentId: number, taskId: number) {
    try {
      const res = await axios.delete(`${API_URL}/classes/${classId}/students/${studentId}/tasks/${taskId}`)
      props.deleteSelf(taskId)
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
      alert('Error removing task, please try again later')
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
    <View style={tw` w-100% px-5 mt-2`}>
      <TouchableOpacity onPress={() => {setShowMore(prevState => !prevState)}} onLongPress={createTwoButtonDeleteAlert} style={tw` flex-row items-center min-h-10`}>
        <Checkbox state={completed} onPress={() => changeTasksCompleteState(props.classId, props.studentId, props.id)}/>
        <Text style={tw` text-xl text-blue-600 ml-4`}>{props.title}</Text>
        {props.description ? <Entypo style={tw` ml-auto`} name={showMore ? "chevron-up" : "chevron-down"} size={34} color="blue" /> : <></>}
      </TouchableOpacity>
      {props.description && showMore 
      ?
      <View style={tw` w-100%`}>
        <Text style={tw` text-base text-blue-600`}>{props.description}</Text>
      </View>
      : <></>}
    </View>
    
  )
}
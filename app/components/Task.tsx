import { View, Text, TouchableOpacity, Button } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Checkbox from './Checkbox';
import { Ionicons } from '@expo/vector-icons'; 

type TaskProps = {
  title: string,
  content?: string,
  completed: boolean,
}

type TaskState = {

}

export default function Task(props: TaskProps) {
  const [completed, setCompleted] = React.useState<boolean>(props.completed)
  const [showMore, setShowMore] = React.useState<boolean>(false)

  async function changeTasksCompleteState() {
    console.log('changing tasks complete state')
  }

  async function deleteTask() {
    console.log('deleting task')
  }

  return (
    <View style={tw` w-100% px-5 mt-2`}>
      <TouchableOpacity onPress={() => {setShowMore(prevState => !prevState)}} style={tw` flex-row items-center`}>
        <Checkbox state={completed} onPress={() => setCompleted(prevState => !prevState)}/>
        <Text style={tw` text-xl text-blue-600 ml-4`}>{props.title}</Text>
        {props.content ? <Ionicons style={tw` ml-auto`} name={showMore ? "remove-outline" : "add-outline"} size={40} color="blue" /> : <></>}
      </TouchableOpacity>
      {props.content && showMore 
      ?
      <View style={tw` w-100%`}>
        <Text style={tw` text-base text-blue-600`}>{props.content}</Text>
      </View>
      : <></>}
    </View>
    
  )
}
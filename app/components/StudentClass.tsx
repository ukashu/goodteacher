import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import ClassAvatar from './ClassAvatar';
import CustomButton from './CustomButton';
import React from 'react';
import tw from 'twrnc';

// style={tw`h-34 mx-2 mb-2 rounded-lg`}

type StudentClassProps = {
  classId: number,
  className: string,
  joinedStatus: string,
  studentId: number,
  joinClass: (classId: number, studentId: number) => void,
  leaveClass: (classId: number, studentId: number) => void,
  removeSelf: (classId: number) => void,
}

function goToTasks() {
  console.log('go to tasks')
}

export default function StudentClass(props : StudentClassProps) {
  const [visible, setVisible] = React.useState(true);

  if (!visible) {
    return (<></>)
  } else if (props.joinedStatus) {

  return (
    <View style={tw`px-3`}>
      <View style={tw`absolute z-3 h-34 ml-3 mt-2 w-100% bg-blue-500 rounded-lg`}>
        <TouchableOpacity style={tw` w-100% rounded-lg h-100% flex-row p-3 justify-between`}>
          <View style={tw``}>
            <Text style={tw`text-xl text-white`}>{props.className}</Text>
            <Text style={tw` text-base text-white`}>{`joined status: ${props.joinedStatus}`}</Text>
          </View>
          <View style={tw`bg-white rounded-md h-100% aspect-square`}>
            <ClassAvatar/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={tw`relative z-2 h-34 ml-1 mt-4 w-100% bg-red-600 rounded-lg`}></View>
    </View>
  )
  } else {
    return (
      <View style={tw`px-3`}>
      <View style={tw`absolute z-3 h-34 ml-3 mt-2 w-100% bg-red-500 rounded-lg`}>
        <TouchableOpacity style={tw` w-100% rounded-lg h-100% flex-row p-3 justify-between`}>
          <View style={tw` `}>
            <Text style={tw`text-xl text-white`}>{`Invite to class ${props.className}`}</Text>
          </View>
          <View style={tw` rounded-md h-100% aspect-square items-end justify-around`}>
            <CustomButton onPress={() => props.joinClass(props.classId, props.studentId)} title="Join Class" style={tw`px-4 py-2 min-w-30 flex-grow-0 rounded-lg bg-blue-500`}/>
            <CustomButton onPress={() => props.removeSelf(props.classId)} title="Leave Class" style={tw`px-4 py-2 min-w-30 flex-grow-0 rounded-lg bg-blue-500`}/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={tw`relative z-2 h-34 ml-1 mt-4 w-100% bg-blue-500 rounded-lg`}></View>
    </View>
    )
  }
}
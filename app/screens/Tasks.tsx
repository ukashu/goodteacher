import { View, Text, Button, ScrollView, RefreshControl, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { StackActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Background from '../../assets/background.svg';
import CustomButton from '../components/CustomButton';
import { Ionicons } from '@expo/vector-icons'; 
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../context/AuthContext';
import axios from 'axios'
import Loading from './Loading';
import { BlurView } from 'expo-blur';
import AddModal from '../components/AddModal';

type TasksNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Tasks'
>;

type Props = {
  navigation: TasksNavigationProp;
}

type TasksState = {
  tasks: Array<any>,
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
  isRefreshing: boolean,
  message: string | null,
}

export default function Tasks({ navigation }: Props) {
  const { authState } = useAuth()

  const [tasks, setTasks] = React.useState<TasksState>({
    tasks: [],
    isError: false,
    isSuccess: false,
    isLoading: false, //change to true in production
    isRefreshing: false,
    message: null,
  })

  const [showModal, setShowModal] = React.useState<boolean>(false)

  //use effect get tasks

  //function to get tasks

  //function to add task

  //function to delete task

  //funciton to update task

  //function on refresh
  const onRefresh = React.useCallback(() => {
    setTasks((prevState) => {
      return {
        ...prevState,
        //classes: [], <- this lets classes rerender on refresh
        isRefreshing: true,
      }
    })
    //getClasses()
  }, []);

  return (
    <>
    {tasks.isLoading ? <Loading /> : (
      <View style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}>
        <View>
          <Background width="100%" height="110%" preserveAspectRatio="none" style={tw`absolute z-1`}/>
          <SafeAreaView style={tw`z-2 items-center h-100% w-100%`}>
            <View style={tw` w-100% px-2 flex-row justify-between items-center`}>
              <TouchableOpacity onPress={() => navigation.dispatch(StackActions.pop(1))}>
                <Ionicons name="arrow-back" size={40} color="red"/>
              </TouchableOpacity>
            </View>
            <Text style={tw` text-4xl text-blue-600`}>Your tasks</Text>
            <ScrollView style={tw` w-100% `} refreshControl={<RefreshControl refreshing={tasks.isRefreshing} onRefresh={onRefresh} />}>
              {}
            </ScrollView>
            <Button onPress={() => navigation.navigate('Tasks')} title="Go to tasks"/>
            <View style={tw` absolute bottom-0 right-0 m-10`}>
              <CustomButton onPress={() => setShowModal(prevState => !prevState)} title="New task" style={tw`px-4 py-2 flex-grow-0 rounded-lg bg-red-500`}/>
            </View>
            {showModal
            ? <BlurView intensity={80} style={tw`absolute w-100% h-110% z-0 m-0`}><AddModal resource="task" title="Add new task" shortInputs={["name", "content"]} requestRoute="" forceRerender={() => console.log('force rerender')} setShowModal={() => setShowModal(prevState => !prevState)}/></BlurView>
            : <></>}
          </SafeAreaView>
        </View>
      </View>
    )}
    </>
  )
}
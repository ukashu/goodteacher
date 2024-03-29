import { View, Text, Button, ScrollView, RefreshControl, Alert, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import tw from '../../lib/tailwind';
import { StackActions } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Background from '../../assets/background.svg';
import CustomButton from '../components/CustomButton';
import AddModal from '../components/AddModal';
import Task from '../components/Task';
import Loading from './Loading';
import { Entypo } from '@expo/vector-icons'; 
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../context/AuthContext';
import axios from 'axios'
import { BlurView } from 'expo-blur';
import { catchTokenExpiredError } from '../utils/utils';
import { useTranslation } from "react-i18next";


type TasksProps = NativeStackScreenProps<RootStackParamList, 'Tasks'>;

type TasksState = {
  tasks: Array<any>,
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
  isRefreshing: boolean,
  message: string | null,
}

export default function Tasks({ route, navigation }: TasksProps) {
  const { authState, onLogout } = useAuth()
  const { t } = useTranslation();

  //addModal
  const [showModal, setShowModal] = React.useState<boolean>(false)

  //tasks
  const [tasks, setTasks] = React.useState<TasksState>({
    tasks: [],
    isError: false,
    isSuccess: false,
    isLoading: true,
    isRefreshing: false,
    message: null,
  })

  //use effect get tasks
  React.useEffect(() => {
    getTasksFromStorage()
    getTasks()
  }, [])

  const getTasksFromStorage = async() => {
    try {
      const stored = await AsyncStorage.getItem(`${API_URL}/classes/${route.params.classId}/students/${route.params.studentId}/tasks`)
      setTasks((prevState) => {
        return {
          ...prevState,
          tasks: stored ? JSON.parse(stored as string) : [],
        }
      })
    } catch(err) {
      
    }
  }

  const getTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/classes/${route.params.classId}/students/${route.params.studentId}/tasks`)
      await AsyncStorage.setItem(`${API_URL}/classes/${route.params.classId}/students/${route.params.studentId}/tasks`, JSON.stringify(res.data.tasks))
      setTasks((prevState) => {
        return {
          ...prevState,
          tasks: res.data.tasks,
          isLoading: false,
          isRefreshing: false,
          isSuccess: true,
          message: 'Success',
        }
      })
    } catch (err: any) {
      catchTokenExpiredError(err, onLogout)
      alert('Error getting tasks, please try again later')
      setTasks((prevState) => {
        return {
          ...prevState,
          isError: true,
          isLoading: false,
          isRefreshing: false,
          isSuccess: false, //not sure if this is needed
          message: 'Generic error',
        }
      })
    }
  }

  //function on refresh
  const onRefresh = React.useCallback(() => {
    setTasks((prevState) => {
      return {
        ...prevState,
        //classes: [], <- this lets classes rerender on refresh
        isRefreshing: true,
      }
    })
    getTasks()
  }, []);

  function removeTaskFromState(taskId: number) {
    setTasks((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((item) => item.id !== taskId)
      }
    })
  }

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
              <TouchableOpacity onPress={() => navigation.dispatch(StackActions.pop(1))}><Entypo name="chevron-left" size={40} color="#ff0000"/></TouchableOpacity>
            </View>
            <Text style={tw` text-4xl text-blue-600 mt-3`}>{t("tasks.Your")} <Text style={tw` font-bold`}>{t("tasks.tasks")}</Text></Text>
            <Text style={tw` text-3xl text-blue-600`}>{route.params.studentAlias}</Text>
            <Text style={tw` text-base text-blue-600 mb-5`}>{route.params.className}</Text>
            <ScrollView style={tw` w-100% px-2`} refreshControl={<RefreshControl refreshing={tasks.isRefreshing} onRefresh={onRefresh} colors={["#3083ff"]}/>}>
              {tasks.tasks.map((item) => <Task title={item.title} description={item.description ? item.description : undefined} completed={item.completed} deleteSelf={removeTaskFromState} id={item.id} classId={route.params.classId} studentId={route.params.studentId} key={item.id}/>)}
            </ScrollView>
            <View style={tw` absolute bottom-0 right-0 m-10`}>
              <CustomButton onPress={() => setShowModal(prevState => !prevState)} title={t("tasks.New task")} style={tw`px-4 py-2 flex-grow-0 rounded-lg bg-custom-red-light`}/>
            </View>
            {showModal
            ? 
              <BlurView intensity={80} style={tw`absolute w-100% h-110% z-0 m-0`}>
                <AddModal resource="task" name={t("tasks.resource")} title={t("tasks.Add new task")} shortInputs={["title", "description"]} requestRoute={`/classes/${route.params.classId}/students/${route.params.studentId}/tasks`} forceRerender={getTasks} setShowModal={() => setShowModal(prevState => !prevState)}/>
              </BlurView>
            : <></>}
          </SafeAreaView>
        </View>
      </View>
    )}
    </>
  )
}
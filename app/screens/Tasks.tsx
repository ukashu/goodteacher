import { View, Text, Button, ScrollView, RefreshControl, Alert, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import React from 'react';
import tw from '../../lib/tailwind';
import { StackActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Background from '../../assets/background.svg';
import CustomButton from '../components/CustomButton';
import { Entypo } from '@expo/vector-icons'; 
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../context/AuthContext';
import axios from 'axios'
import Loading from './Loading';
import { BlurView } from 'expo-blur';
import AddModal from '../components/AddModal';
import Task from '../components/Task';


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
  const { authState } = useAuth()

  const [tasks, setTasks] = React.useState<TasksState>({
    tasks: [],
    isError: false,
    isSuccess: false,
    isLoading: true,
    isRefreshing: false,
    message: null,
  })

  const [showModal, setShowModal] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (showModal) {
      fadeIn()
    } else {
      fadeOut()
    }
  }, [showModal])

  //use effect get tasks
  React.useEffect(() => {
    getTasks()
  }, [])

  const getTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/classes/${route.params.classId}/students/${route.params.studentId}/tasks`)
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

  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 300 ms
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 100 ms
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

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
            <Text style={tw` text-4xl text-blue-600 mt-3`}>Your <Text style={tw` font-bold`}>tasks</Text></Text>
            <Text style={tw` text-3xl text-blue-600`}>{route.params.studentAlias}</Text>
            <Text style={tw` text-base text-blue-600 mb-5`}>{route.params.className}</Text>
            <ScrollView style={tw` w-100% px-2`} refreshControl={<RefreshControl refreshing={tasks.isRefreshing} onRefresh={onRefresh} colors={["blue"]}/>}>
              {tasks.tasks.map((item) => <Task title={item.title} description={item.description ? item.description : undefined} completed={item.completed} deleteSelf={removeTaskFromState} id={item.id} classId={route.params.classId} studentId={route.params.studentId} key={item.id}/>)}
            </ScrollView>
            <View style={tw` absolute bottom-0 right-0 m-10`}>
              <CustomButton onPress={() => setShowModal(prevState => !prevState)} title="New task" style={tw`px-4 py-2 flex-grow-0 rounded-lg bg-custom-red-light`}/>
            </View>
            {showModal
            ? 
            <Animated.View
            style={
            {
              // Bind opacity to animated value
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: fadeAnim,
            }}>
              <BlurView intensity={80} style={tw`absolute w-100% h-110% z-0 m-0`}>
                <AddModal resource="task" title="Add new task" shortInputs={["title", "description"]} requestRoute={`/classes/${route.params.classId}/students/${route.params.studentId}/tasks`} forceRerender={getTasks} setShowModal={() => setShowModal(prevState => !prevState)}/>
              </BlurView>
            </Animated.View>
            : <></>}
          </SafeAreaView>
        </View>
      </View>
    )}
    </>
  )
}
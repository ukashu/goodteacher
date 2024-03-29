import { View, Text, ScrollView, RefreshControl, TouchableOpacity, Animated } from 'react-native';
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
import Student from '../components/Student';
import AddModal from '../components/AddModal';
import Loading from './Loading';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../context/AuthContext';
import axios from 'axios'
import { BlurView } from 'expo-blur';
import { Entypo } from '@expo/vector-icons'; 
import { catchTokenExpiredError } from '../utils/utils';
import { useTranslation } from "react-i18next";

type StudentsProps = NativeStackScreenProps<RootStackParamList, 'Students'>;

type StudentsState = {
  students: Array<any>,
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
  isRefreshing: boolean,
  message: string | null,
}

export default function Students({ route, navigation }: StudentsProps) {
  const { authState, onLogout } = useAuth()
  const { t } = useTranslation();

  //addModal
  const [showModal, setShowModal] = React.useState<boolean>(false)

  //students
  const [students, setStudents] = React.useState<StudentsState>({
    students: [],
    isError: false,
    isSuccess: false,
    isLoading: true,
    isRefreshing: false,
    message: null,
  })

  //use effect get students
  React.useEffect(() => {
    getStudentsFromStorage()
    getStudents()
  }, [])

  const getStudentsFromStorage = async() => {
    try {
      const stored = await AsyncStorage.getItem(`${API_URL}/classes/${route.params.classId}/students`)
      setStudents((prevState) => {
        return {
          ...prevState,
          students: stored ? JSON.parse(stored as string) : [],
        }
      })
    } catch(err) {
      
    }
  }

  const getStudents = async () => {
    try {
      const res = await axios.get(`${API_URL}/classes/${route.params.classId}/students`)
      await AsyncStorage.setItem(`${API_URL}/classes/${route.params.classId}/students`, JSON.stringify(res.data.studentsInClass))
      setStudents((prevState) => {
        return {
          ...prevState,
          students: res.data.studentsInClass,
          isLoading: false,
          isRefreshing: false,
          isSuccess: true,
          message: 'Success',
        }
      })
    } catch (err: any) {
      catchTokenExpiredError(err, onLogout)
      alert('Error getting students, please try again later')
      setStudents((prevState) => {
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

  //function to remove student from state
  function removeStudentFromState(studentId: number) {
    setStudents((prevState) => {
      return {
        ...prevState,
        students: prevState.students.filter((item) => item.user_id !== studentId)
      }
    })
  }

  //function on refresh
  const onRefresh = React.useCallback(() => {
    setStudents((prevState) => {
      return {
        ...prevState,
        //students: [], <- this lets students rerender on refresh
        isRefreshing: true,
      }
    })
    getStudents()
  }, []);

  return (
    <>
    {students.isLoading ? <Loading /> : (
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
                <Entypo name="chevron-left" size={40} color="#ff0000"/>
              </TouchableOpacity>
            </View>
            <Text style={tw` text-4xl text-blue-600 mt-5`}>{t("students.Your")} <Text style={tw` font-bold`}>{t("students.students")}</Text></Text>
            <Text style={tw` text-2xl text-blue-600 mb-5`}>{route.params.className}</Text>
            <ScrollView style={tw` w-100% `} refreshControl={<RefreshControl refreshing={students.isRefreshing} onRefresh={onRefresh} colors={["#3083ff"]}/>}>
              {students.students.map((item) => <Student studentId={item.user_id} classId={route.params.classId} studentAlias={item.user_alias} joinedStatus={item.joined} deleteSelf={removeStudentFromState} key={item.user_id} goToTasks={() => navigation.navigate('Tasks', { classId: route.params.classId, className: route.params.className, studentId: item.user_id, studentAlias: item.user_alias })}/>)}
            </ScrollView>
            <View style={tw` absolute bottom-0 right-0 m-10`}>
              <CustomButton onPress={() => setShowModal(prevState => !prevState)} title={t("students.Add student")} style={tw`px-4 py-2 flex-grow-0 rounded-lg bg-custom-red-light `}/>
            </View>
            {showModal
            ? 
            <BlurView intensity={80} style={tw`absolute w-100% h-110% z-0 m-0`}>
                <AddModal resource="student" name={t("students.resource")} title={t("students.Add new student")} shortInputs={["email", "alias"]} requestRoute={`/classes/${route.params.classId}/students`} forceRerender={getStudents} setShowModal={() => setShowModal(prevState => !prevState)}/>
            </BlurView>
            : <></>}
          </SafeAreaView>
        </View>
      </View>
    )}
    </>
  )
}
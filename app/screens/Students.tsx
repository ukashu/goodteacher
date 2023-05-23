import { View, Text, Button, ScrollView, RefreshControl, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { StackActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Background from '../../assets/background.svg';
import CustomButton from '../components/CustomButton';
import { Ionicons } from '@expo/vector-icons'; 
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../context/AuthContext';
import axios from 'axios'
import Loading from './Loading';
import Student from '../components/Student';
import { BlurView } from 'expo-blur';
import AddModal from '../components/AddModal';

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
  const { authState } = useAuth()

  const [students, setStudents] = React.useState<StudentsState>({
    students: [],
    isError: false,
    isSuccess: false,
    isLoading: false, //change to true in production
    isRefreshing: false,
    message: null,
  })

  const [showModal, setShowModal] = React.useState<boolean>(false)

  //use effect get students

  //function to get students

  //function to add student

  //function to delete student

  //function on refresh
  const onRefresh = React.useCallback(() => {
    setStudents((prevState) => {
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
                <Ionicons name="arrow-back" size={40} color="red"/>
              </TouchableOpacity>
            </View>
            <Text style={tw` text-4xl text-blue-600`}>Your <Text style={tw` font-bold`}>students</Text></Text>
            <Text style={tw` text-2xl text-blue-600`}>{route.params.className}</Text>
            <ScrollView style={tw` w-100% `} refreshControl={<RefreshControl refreshing={students.isRefreshing} onRefresh={onRefresh} />}>
              <Student studentId={1} studentAlias='ALIAS' deleteSelf={() => console.log('deleting self')}/>
            </ScrollView>
            <Button onPress={() => navigation.navigate('Tasks')} title="Go to tasks"/>
            <View style={tw` absolute bottom-0 right-0 m-10`}>
              <CustomButton onPress={() => setShowModal(prevState => !prevState)} title="New student" style={tw`px-4 py-2 flex-grow-0 rounded-lg bg-red-500`}/>
            </View>
            {showModal
            ? <BlurView intensity={80} style={tw`absolute w-100% h-110% z-0 m-0`}><AddModal title="Add new student" shortInputs={["email", "alias"]} requestRoute="" forceRerender={() => console.log('force rerender')} setShowModal={() => setShowModal(prevState => !prevState)}/></BlurView>
            : <></>}
          </SafeAreaView>
        </View>
      </View>
    )}
    </>
  )
}
import { View, Text, Button, ScrollView, RefreshControl, Alert, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons'; 
import { useAuth } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackActions } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import Background from '../../assets/background.svg';
import CustomButton from '../components/CustomButton';
import StudentClass from '../components/StudentClass';
import TeacherClass from '../components/TeacherClass';
import { API_URL } from '../context/AuthContext';
import axios from 'axios'
import Loading from './Loading';
import { BlurView } from 'expo-blur';
import AddModal from '../components/AddModal';

type ClassesNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Classes'
>;

type Props = {
  navigation: ClassesNavigationProp;
};

type ClassesState = {
  classes: Array<any>,
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
  isRefreshing: boolean,
  message: string | null,
}

export default function Classes({ navigation }: Props) {
  const { authState, onLogout } = useAuth()

  const [classes, setClasses] = React.useState<ClassesState>({
    classes: [],
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

  //useEffect getclasses once
  React.useEffect(() => {
    getClasses()
  }, [])

  const getClasses = async () => {

    try {
      const res = await axios.get(`${API_URL}/classes`)
      setClasses((prevState) => {
        return {
          ...prevState,
          classes: res.data.myClasses,
          isLoading: false,
          isRefreshing: false,
          isSuccess: true,
          message: 'Success',
        }
      })
    } catch (err: any) {
      alert('Error getting classes, please try again later')
      setClasses((prevState) => {
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

  function removeClassFromState(classId: number) {
    setClasses((prevState) => {
      return {
        ...prevState,
        classes: prevState.classes.filter((item) => item.class_id !== classId && item.id !== classId)
      }
    })
  }

  function changeJoinedStatus(classId: number) {
    setClasses((prevState) => {
      return {
        ...prevState,
        classes: prevState.classes.map((item) => {
          if (item.class_id === classId) {
            return {
              ...item,
              joined: !item.joined
            }
          }
          return item
        })
      }
    })
  }

  //if isloading return loading component
  //if iserror alert error and reset classes object to default
  //add refresh on pull down (just reset classes object to default and call getclasses again)

  //refreshing functionality
  const onRefresh = React.useCallback(() => {
    setClasses((prevState) => {
      return {
        ...prevState,
        //classes: [], <- this lets classes rerender on refresh
        isRefreshing: true,
      }
    })
    getClasses()
  }, []);

  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
    {classes.isLoading ? <Loading /> : (
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
            <View style={tw` w-100% px-2 flex-row justify-end items-center`}>
              <CustomButton onPress={onLogout} title="Log out" style={tw`px-4 py-2 flex-grow-0 mt-2 mr-2 rounded-lg bg-blue-500`}/>
            </View>
            <Text style={tw` text-4xl text-blue-600 mt-3 mb-5`}>Your <Text style={tw` font-bold`}>classes</Text></Text>
            <ScrollView style={tw` w-100% `} refreshControl={<RefreshControl refreshing={classes.isRefreshing} onRefresh={onRefresh} />}>
              {classes.classes.map((classObj: any) => { 
                if (authState?.accountType === 'TEACHER') {
                  return <TeacherClass removeSelf={removeClassFromState} goToStudents={() => navigation.navigate('Students', { classId: classObj.id, className: classObj.name })} key={classObj.id} className={classObj.name} classId={classObj.id}/>
                } else {
                  return <StudentClass removeSelf={removeClassFromState} joinSelf={changeJoinedStatus} key={classObj.class_id} className={classObj.class_id} classId={classObj.class_id} studentId={Number(authState?.userId)} joinedStatus={classObj.joined}/>
                }
              })}
            </ScrollView>
            <View style={tw` absolute bottom-0 right-0 m-10`}>
              <CustomButton onPress={() => setShowModal(prevState => !prevState)} title="New class" style={tw`px-4 py-2 flex-grow-0 rounded-lg bg-red-500`}/>
            </View>
            {showModal
            ? 
              <BlurView intensity={80} style={tw`absolute w-100% h-110% z-0 m-0`}>
                <Animated.View
                style={
                  {
                    // Bind opacity to animated value
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    opacity: fadeAnim,
                  }}>
                <AddModal resource="class" title="Add new class" shortInputs={["name"]} requestRoute="/classes" forceRerender={getClasses} setShowModal={() => setShowModal(prevState => !prevState)}/>
                </Animated.View>
              </BlurView>
            : <></>}
          </SafeAreaView>
        </View>
      </View>
    )}
    </>
  )
}
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from '../../lib/tailwind';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../../App';
import Background from '../../assets/background.svg';
import CustomButton from '../components/CustomButton';
import StudentClass from '../components/StudentClass';
import TeacherClass from '../components/TeacherClass';
import DrawerModal from '../components/DrawerModal';
import AddModal from '../components/AddModal';
import Loading from './Loading';
import { API_URL } from '../context/AuthContext';
import axios from 'axios'
import { BlurView } from 'expo-blur';
import { Entypo } from '@expo/vector-icons';
import { catchTokenExpiredError } from '../utils/utils';
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  //addModal
  const [showModal, setShowModal] = React.useState<boolean>(false)

  //drawerModal
  const [showDrawerModal, setShowDrawerModal] = React.useState<boolean>(false)

  //classes
  const [classes, setClasses] = React.useState<ClassesState>({
    classes: [],
    isError: false,
    isSuccess: false,
    isLoading: true,
    isRefreshing: false,
    message: null,
  })

  //useEffect getclasses once
  React.useEffect(() => {
    getClassesFromStorage()
    getClasses()
  }, [])

  const getClassesFromStorage = async() => {
    try {
      const stored = await AsyncStorage.getItem(`${API_URL}/classes`)
      setClasses((prevState) => {
        return {
          ...prevState,
          classes: stored ? JSON.parse(stored as string) : [],
        }
      })
    } catch(err) {
      
    }
  }

  const getClasses = async () => {
    try {
      const res = await axios.get(`${API_URL}/classes`)
      await AsyncStorage.setItem(`${API_URL}/classes`, JSON.stringify(res.data.myClasses))
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
      catchTokenExpiredError(err, onLogout)
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
            <View style={tw` w-100% px-2 flex-row justify-between items-center`}>
              <TouchableOpacity onPress={() => setShowDrawerModal(true)} style={tw` ml-auto`}>
                <Entypo name="menu" size={40} color="#2563eb"/>
              </TouchableOpacity>
            </View>
            <Text style={tw` text-4xl text-blue-600 mt-3 mb-5`}>{t('classes.Your')}<Text style={tw` font-bold`}> {t('classes.classes')}</Text></Text>
            <ScrollView style={tw` w-100% `} refreshControl={<RefreshControl refreshing={classes.isRefreshing} onRefresh={onRefresh} colors={["#3083ff"]}/>}>
              {classes.classes.map((item) => { 
                if (authState?.accountType === 'TEACHER') {
                  return <TeacherClass removeSelf={removeClassFromState} goToStudents={() => navigation.navigate('Students', { classId: item.id, className: item.name })} key={item.id} className={item.name} classId={item.id} xOffset={item.x_offset} yOffset={item.y_offset} pathRotation={item.path_rotation}/>
                } else {
                  return <StudentClass removeSelf={removeClassFromState} goToTasks={() => navigation.navigate('Tasks', { classId: item.class_id, className: item.name, studentAlias: item.user_alias, studentId: Number(authState?.userId) })} joinSelf={changeJoinedStatus} key={item.class_id} className={item.class_id} classId={item.class_id} studentId={Number(authState?.userId)} joinedStatus={item.joined}/>
                }
              })}
            </ScrollView>
            <View style={tw` absolute bottom-0 right-0 m-10`}>
              <CustomButton onPress={() => setShowModal(prevState => !prevState)} title={t("classes.New class")} style={tw`px-4 py-2 flex-grow-0 rounded-lg bg-custom-red-light`}/>
            </View>
            {showModal
            ? 
              <BlurView intensity={80} style={tw`absolute w-100% h-110% z-0 m-0`}>
                
                <AddModal resource="class" name={t('classes.resource')} title={t("classes.Add new class")} shortInputs={["name"]} requestRoute="/classes" forceRerender={getClasses} setShowModal={() => setShowModal(prevState => !prevState)}/>
                
              </BlurView>
            : <></>}
            {showDrawerModal
            ? <DrawerModal name={String(authState?.name)} hideDrawerModal={() => setShowDrawerModal(false)} logout={onLogout}/>
            : <></>}
          </SafeAreaView>
        </View>
      </View>
    )}
    </>
  )
}
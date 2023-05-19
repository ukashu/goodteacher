import { View, Text, Button, ScrollView, RefreshControl } from 'react-native';
import { Dimensions } from 'react-native';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackActions } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import tw from 'twrnc';
import Background from '../../assets/background.svg';
import CustomButton from '../components/CustomButton';
import BackButton from '../components/BackButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Class from '../components/Class';
import { API_URL } from '../context/AuthContext';
import axios from 'axios'
import Loading from './Loading';

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
      alert('Error getting classes, plesae try again later')
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

  //useEffect getclasses once
  React.useEffect(() => {
    getClasses()
  }, [])


  //if isloading return loading component
  //if iserror alert error and reset classes object to default
  //add refresh on pull down (just reset classes object to default and call getclasses again)

  //refreshing functionality
  const onRefresh = React.useCallback(() => {
    setClasses((prevState) => {
      return {
        ...prevState,
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
        <SafeAreaView>
          <Background width="100%" height="110%" preserveAspectRatio="none" style={tw`absolute z-1`}/>
          <View style={tw`z-2 items-center m-auto h-100% w-100%`}>
            <View style={tw` w-100% px-2 flex-row justify-between items-center`}>
              <BackButton onPress={() => navigation.dispatch(StackActions.pop(1))}/>
              <CustomButton onPress={onLogout} title="Log out" style={tw`px-4 py-2 flex-grow-0 rounded-lg bg-blue-500`}/>
            </View>
            <Text style={tw` text-4xl text-blue-600`}>Your classes</Text>
            <ScrollView style={tw` w-100% `} refreshControl={<RefreshControl refreshing={classes.isRefreshing} onRefresh={onRefresh} />}>
              {classes.classes.map((classObj: any) => { return <Class key={classObj.class_id} className={classObj.class_id} joinedStatus={classObj.joined}/>})}
            </ScrollView>
            <View style={tw` bg-red-800 mt-auto`}>
              <Button onPress={getClasses} title="Fetch classes test"/>
              <Button onPress={() => navigation.navigate('Students')} title="Go to students"/>
            </View>
          </View>
        </SafeAreaView>
      </View>
    )}
    </>
  )
}
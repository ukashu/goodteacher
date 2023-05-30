import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import tw from 'twrnc';
import Logo from '../../assets/logo.svg';
import Background from '../../assets/background.svg';
import CustomInput from '../components/CustomInput'
import Checkbox from '../components/Checkbox';

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

export default function Register({ navigation }: Props) {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('')
  const [isTeacher, setIsTeacher] = React.useState(false)
  const { onRegister } = useAuth()

  const register = async () => {
    const result = await onRegister!(name, email, password, passwordConfirmation, isTeacher?'TEACHER':'STUDENT')
    if (result && result.error) {
      alert(result.msg)
    } else 
    if (result && result.data.error && result.data.message) {
      alert(result.data.message)
    } else {
      alert('Registered successfully, we sent you an email with a link to activate your account')
    }
  }

  return (
    <>
    <View style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    }}>
      <Background width="100%" height="110%" preserveAspectRatio="none" style={tw`absolute z-1`}/>
      <View style={tw`z-2 items-center justify-between m-auto h-100% w-100%`}>
        <Logo width={512} height={296} />
        <View style={tw`w-100% h-60% items-center justify-around px-10`}>
          <View style={tw`w-100% h-75% justify-around items-center`}>
            <CustomInput placeholder="name" onChangeText={(text: string) => setName(text)} value={name} autoCapitalize='none'/>
            <CustomInput placeholder="email" onChangeText={(text: string) => setEmail(text)} value={email} autoCapitalize='none'/>
            <CustomInput placeholder="password" secureTextEntry={false} onChangeText={(password: string) => setPassword(password)} value={password} autoCapitalize='none'/>
            <CustomInput placeholder="confirm password" secureTextEntry={false} onChangeText={(password: string) => setPasswordConfirmation(password)} value={passwordConfirmation} autoCapitalize='none'/>
            <View style={tw`w-100% flex-row justify-between items-center`}>
              <View style={tw`flex-row justify-between items-center`}>
                <Checkbox state={isTeacher} onPress={() => setIsTeacher(prevState=>!prevState)}/>
                <Text style={tw`text-white text-xs ml-3`} >{"Click to create a teacher account"}</Text>
              </View>
              <TouchableOpacity style={tw`px-4 py-2 rounded-lg min-w-23 bg-blue-500`} onPress={register}><Text style={tw`text-white text-center`}>Register</Text></TouchableOpacity>
            </View>
          </View>
          <View style={tw`w-100% flex-row justify-between items-center`}>
            <Text style={tw`text-white`} >{"Have an account already? "}</Text>
            <TouchableOpacity style={tw`px-4 py-2 rounded-lg min-w-23 bg-blue-500 self-end`} onPress={() => navigation.navigate('Login')}><Text style={tw`text-white text-center`}>Sign in</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    </>
    
  )
}
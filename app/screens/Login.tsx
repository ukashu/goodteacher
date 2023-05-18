import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import tw from 'twrnc';
import Logo from '../../assets/logo.svg';
import Background from '../../assets/background.svg';
import CustomInput from '../components/CustomInput'

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function Login({ navigation }: Props) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { onLogin } = useAuth()

  const login = async () => {
    const result = await onLogin!(email, password)
    if (result && result.error) {
      alert(result.msg)
    }
  }

  return (
    <View style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    }}>
      <Background width="100%" height="110%" preserveAspectRatio="none" style={tw`absolute z-1`}/>
      <View style={tw`z-2 items-center justify-between m-auto h-100% w-100%`}>
        <Logo width={Dimensions.get('window').width + 2} height={296} />
        <View style={tw`w-100% h-50% items-center justify-around px-10`}>
          <View style={tw`w-100% h-75% justify-around items-center`}>
            <CustomInput placeholder="email" onChangeText={(text: string) => setEmail(text)} value={email} autoCapitalize='none'/>
            <CustomInput placeholder="password" secureTextEntry={false} onChangeText={(password: string) => setPassword(password)} value={password} autoCapitalize='none'/>
            <View style={tw`w-100% flex-row justify-between`}>
              <Text></Text>
              <TouchableOpacity style={tw`px-4 py-2 rounded-lg min-w-23 bg-blue-500`} onPress={login}><Text style={tw`text-white text-center`}>Sign in</Text></TouchableOpacity>
            </View>
          </View>
          <View style={tw`w-100% flex-row justify-between items-center`}>
              <Text style={tw`text-white`} >{"Don't have an account? "}</Text>
              <TouchableOpacity style={tw`px-4 py-2 rounded-lg min-w-23 bg-blue-500 self-end`} onPress={() => navigation.navigate('Register')}><Text style={tw`text-white text-center`}>Sign up</Text></TouchableOpacity>
            </View>
        </View>
      </View>
    </View>
  )
}
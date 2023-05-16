import { View, StyleSheet, TextInput, Button } from 'react-native';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import tw from 'twrnc';
import Logo from '../../assets/logo.svg';
import Background from '../../assets/background.svg';

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
    <View>
      <Background width="100%" height="110%" preserveAspectRatio="none" style={tw`absolute z-1`}/>
      <View style={tw`z-2 items-center justify-between m-auto h-100% w-100%`}>
        <Logo width={512} height={296} />
        <View>
          <TextInput placeholder="Email" onChangeText={(text: string) => setEmail(text)} value={email}/>
          <TextInput placeholder="Password" secureTextEntry={true} onChangeText={(password: string) => setPassword(password)} value={password}/>
          <Button onPress={login} title="Sign In"/>
        </View>
      </View>
    </View>
  )
}
import { View, StyleSheet, TextInput, Button } from 'react-native';
import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
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
      <TextInput placeholder="Email" onChangeText={(text: string) => setEmail(text)} value={email}/>
      <TextInput placeholder="Password" secureTextEntry={true} onChangeText={(password: string) => setPassword(password)} value={password}/>
      <Button onPress={login} title="Sign In"/>
    </View>
  )
}
import { View, StyleSheet, TextInput, Button } from 'react-native';
import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { onRegister } = useAuth()

  const register = async () => {
    const result = await onRegister!(name, email, password)
    if (result && result.error) {
      alert(result.msg)
    }
  }

  return (
    <View>
      <TextInput placeholder="Name" onChangeText={(text: string) => setName(text)} value={name}/>
      <TextInput placeholder="Email" onChangeText={(text: string) => setEmail(text)} value={email}/>
      <TextInput placeholder="Password" secureTextEntry={true} onChangeText={(password: string) => setPassword(password)} value={password}/>
      <Button onPress={register} title="Register"/>
    </View>
  )
}
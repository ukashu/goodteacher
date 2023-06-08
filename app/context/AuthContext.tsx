import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage';
import z from 'zod'
import * as schema from '../utils/schemas'

export interface AuthContextProps {
  authState?: { token: string | null, authenticated: boolean | null, accountType: string | null, userId: string | null, email: string | null, name: string | null };
  onRegister?: ({}: schema.RegisterUserInput) => Promise<any>;
  onLogin?: ({}: schema.LoginUserInput) => Promise<any>;
  onLogout?: () => Promise<any>;
}

type AuthStorageType = {
  token: string,
  accountType: string,
  userId: string,
  name: string,
  email: string,
}

const AUTH_KEY = 'goodteacher-auth'
export const API_URL = 'http://192.168.0.135:5000/api'
const AuthContext = createContext<AuthContextProps>({})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{ 
    token: string | null,
    accountType: string | null,
    userId: string | null,
    email: string | null,
    name: string | null,
    authenticated: boolean
  }>({
    token: null,
    accountType: null,
    userId: null,
    email: null,
    name: null,
    authenticated: false
  })

  useEffect(() => {
    const loadToken = async () => {
      const auth = await SecureStore.getItemAsync(AUTH_KEY)

      const token: AuthStorageType = JSON.parse(auth as string)

      if (token && token.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.token}`

        setAuthState({
          token: token.token,
          accountType: token.accountType,
          userId: token.userId,
          email: token.email,
          name: token.name,
          authenticated: true
        })
      }
    }
    loadToken()
  }, [])

  const register = async (body: schema.RegisterUserInput) => {
    try {
      schema.registerUserSchema.parse({body})
      return await axios.post(`${API_URL}/users`, { name: body.name, email: body.email, password: body.password, passwordConfirmation: body.passwordConfirmation, type: body.type })
    } catch(err: any) {
      if (err instanceof z.ZodError) {
        return { error: true, msg: err.issues[0].message }
      }
      if (err.response && err.response.data.message) {
        return { error: true, msg: err.response.data.message }
      } 
      return { error: true, msg: 'Register error'}
    }
  }

  const login = async (body: schema.LoginUserInput) => {
    try {
      schema.loginUserSchema.parse({body})
      const result = await axios.post(`${API_URL}/users/session`, { email: body.email, password: body.password })

      const auth: AuthStorageType = {token: result.data.token, userId: result.data.id, accountType: result.data.accountType, name: result.data.name, email: result.data.email}

      setAuthState({
        token: result.data.token,
        accountType: result.data.accountType,
        userId: result.data.id,
        email: result.data.email,
        name: result.data.name,
        authenticated: true
      })

      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`

      await SecureStore.setItemAsync(AUTH_KEY, JSON.stringify(auth))

      return result;

    } catch(err: any) {
      if (err instanceof z.ZodError) {
        return { error: true, msg: err.issues[0].message }
      }
      if (err.response.data.message) {
        return { error: true, msg: err.response.data.message }
      } else {
        return { error: true, msg: 'Login error'}
      }
    }
  }

  const logout = async () => {
    const removeAppKeys = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys()
        await AsyncStorage.multiRemove(keys)
      } catch(e) {
       console.log(e)
      }
    }

    await SecureStore.deleteItemAsync(AUTH_KEY)
    removeAppKeys()

    axios.defaults.headers.common['Authorization'] = ''

    setAuthState({
      token: null,
      accountType: null,
      userId: null,
      email: null,
      name: null,
      authenticated: false
    })
  }

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  ) 
}
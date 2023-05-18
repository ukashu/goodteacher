import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

interface AuthContextProps {
  authState?: { token: string | null, authenticated: boolean | null, accountType: string | null, userId: string | null };
  onRegister?: (name: string, email: string, password: string, passwordConfirmation: string, type: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
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
    authenticated: boolean
  }>({
    token: null,
    accountType: null,
    userId: null,
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
          authenticated: true
        })
      }
    }
    loadToken()
  }, [])

  const register = async (name: string, email: string, password: string, passwordConfirmation: string, type: string) => {
    try {
      return await axios.post(`${API_URL}/users`, { name, email, password, passwordConfirmation, type })
    } catch(err: any) {
      if (err.response.data.message) {
        return { error: true, msg: err.response.data.message }
      } else {
        return { error: true, msg: err}
      }
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/users/session`, { email, password })

      const auth: AuthStorageType = {token: result.data.token, userId: result.data.id, accountType: result.data.accountType, name: result.data.name, email: result.data.email}

      console.log({data: result.data})

      setAuthState({
        token: result.data.token,
        accountType: result.data.accountType,
        userId: result.data.id,
        authenticated: true
      })

      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`

      await SecureStore.setItemAsync(AUTH_KEY, JSON.stringify(auth))

      return result;

    } catch(err: any) {
      console.log(err)
      if (err.response.data.message) {
        return { error: true, msg: err.response.data.message }
      } else {
        return { error: true, msg: err}
      }
    }
  }

  const logout = async () => {
    await SecureStore.deleteItemAsync(AUTH_KEY)

    axios.defaults.headers.common['Authorization'] = ''

    setAuthState({
      token: null,
      accountType: null,
      userId: null,
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
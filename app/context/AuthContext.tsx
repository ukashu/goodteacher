import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

interface AuthContextProps {
  authState?: { token: string | null, authenticated: boolean | null }
  onRegister?: (name: string, email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'goodteacher-token'
export const API_URL = ''
const AuthContext = createContext<AuthContextProps>({})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{ 
    token: string | null,
    authenticated: boolean | null 
  }>({
    token: null,
    authenticated: null
  })

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY)

      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        setAuthState({
          token: token,
          authenticated: true
        })
      }
    }
    loadToken()
  }, [])

  const register = async (name: string, email: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/users`, { name, email, password })
    } catch(err) {
      return { error: true, msg: (err as any) }
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/users/session`, { email, password })

      setAuthState({
        token: result.data.token,
        authenticated: true
      })

      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token)

      return result;

    } catch(err) {
      console.log(err)
      return { error: true, msg: (err as any) }
    }
  }

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY)

    axios.defaults.headers.common['Authorization'] = ''

    setAuthState({
      token: null,
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
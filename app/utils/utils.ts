import { AuthContextProps } from '../context/AuthContext'

export async function catchTokenExpiredError(error: any, authLogout: AuthContextProps['onLogout']) {
  console.log(error.response.data.message)
  if (error.response.data.message === 'jwt expired' && authLogout) {
    authLogout()
  }
}
import { AuthContextProps } from '../context/AuthContext'

export async function catchTokenExpiredError(error: any, authLogout: AuthContextProps['onLogout']) {
  if (error.response.data.message === 'jwt expired' && authLogout) {
    authLogout()
  }
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
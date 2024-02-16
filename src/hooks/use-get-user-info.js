/*
usage:
  import { useGetUserInfo } from './hooks/use-get-user-info'
  const { name, profilePhoto, userID, isAuth } = useGetUserInfo()
*/

export const useGetUserInfo = () => {
  const { name, profilePhoto, userID, isAuth } = JSON.parse(localStorage.getItem('auth'))

  return { name, profilePhoto, userID, isAuth }
}

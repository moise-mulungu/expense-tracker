import { auth, googleAuthProvider } from '../../config/firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate, Navigate } from 'react-router-dom'
import '../../App.css'
import { useGetUserInfo } from '../../hooks/use-get-user-info'

export const Auth = () => {
  const navigate = useNavigate()
  const {isAuth} = useGetUserInfo()

  const SignInWithGoogle = async () => {
    const results = await signInWithPopup(auth, googleAuthProvider)
    console.log(results)

    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    }

    localStorage.setItem('auth', JSON.stringify(authInfo))
    navigate('/expense-tracker')
  }

  if (isAuth) {
    return <Navigate to="/expense-tracker" />
  } 

  // or you can use the useEffect hook to check if the user is authenticated:
  // useEffect(() => {
  //   if (isAuth) {
  //     navigate('/expense-tracker')
  //   }

  return (
    <div className="login-page">
      <p>Sign In With Google to Continue</p>
      <button className="login-with-google-btn" onClick={SignInWithGoogle}>
        Sign In With Google
      </button>
    </div>
  )
}
// Path: src/pages/auth/index.jsx

/*
To fix the regular login, i did the following:
  1. imported the Navigate component from react-router-dom
  2. imported the useGetUserInfo hook from the use-get-user-info file
  3. created a variable called isAuth and set it equal to the isAuth property from the useGetUserInfo hook
  4. created a conditional statement that checks if the user is authenticated and if they are, it will redirect them to the expense-tracker page
  5. there is an alternative way to redirect the user to the expense-tracker page using the useEffect hook
  6. the useEffect hook will check if the user is authenticated and if they are, it will redirect them to the expense-tracker page
  7. tested the code and it works as expected.
*/
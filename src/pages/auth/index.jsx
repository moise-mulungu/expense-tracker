import { auth, googleAuthProvider } from '../../config/firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import '../../App.css'

export const Auth = () => {
  const navigate = useNavigate()
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

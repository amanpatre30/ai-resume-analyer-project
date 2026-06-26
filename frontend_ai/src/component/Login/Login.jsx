import React from 'react'
import styles from "./Login.module.css"
import GoogleIcon from '@mui/icons-material/Google';
import VpnKeyIcon from '@mui/icons-material/VpnKey';


import { auth, provider } from '../../utils/firbase';
import { signInWithPopup } from 'firebase/auth';
import { useContext } from "react"
import { AuthContext } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios'

const Login = () => {
 const navigate = useNavigate()
 const { isLogin, setLogin, userInfo, setUserInfo } = useContext(AuthContext)
 const handleLogin = async () => {
  try {
   const result = await signInWithPopup(auth, provider);
   const user = result.user
   const userData = {
    name: user.displayName,
    email: user.email,
    photoUrl: user.photoURL
   }
   await axios.post(`/api/user`, userData).then((response) => {
    setUserInfo(response.data.user)
    localStorage.setItem("userInfo", JSON.stringify(response.data.user))

   }).catch(error => {
    console.log(error)
   })
   setLogin(true)
   localStorage.setItem("isLogin", true)
   navigate("/dashboard")

  } catch (error) {
   alert("Something went wrong");
   console.log(error)
  }

 }


 return (
  <div className={styles.Login}>
   <div className={styles.loginCard}>
    <div className={styles.loginCardTitle}>
     <h1>Login</h1>
     <VpnKeyIcon />
    </div>
    <div className={styles.googleBtn} onClick={handleLogin}> <GoogleIcon sx={{ fontSize: 20, color: "red" }} /> Sign in with Google</div>
   </div>
  </div>
 )
}

export default Login;
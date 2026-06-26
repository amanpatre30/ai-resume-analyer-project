import { createContext, useState } from "react";


export const AuthContext = createContext()


const AuthProvider = ({ children }) => {
 const login = localStorage.getItem("isLogin");
 const userInfoData = localStorage.getItem("userInfo");

 const [isLogin, setLogin] = useState(login ? login : false);
 const [userInfo, setUserInfo] = useState(userInfoData ? JSON.parse(userInfoData) : null);


 return (
  <AuthContext.Provider value={{ isLogin, setLogin, userInfo, setUserInfo }}>
   {children}
  </AuthContext.Provider>
 )
}

export default AuthProvider
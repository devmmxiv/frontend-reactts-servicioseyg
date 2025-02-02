import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import LoginContext from "../../context/LoginContext"

export const useLogin =()=>{
    const {userLogin,handleLogin}=useContext(LoginContext)

    return{
        userLogin,
        handleLogin
    }
}
import axios from 'axios'
import { useState } from 'react'
import {toast} from "react-hot-toast"
import { useAuthContext } from '../context/AuthContext'

const UserLogOut = () => {
    const [loading,setLoading]=useState(false)
    
    const {setauthUser}=useAuthContext()

    const logout=async()=>{
        setLoading(true)
        try {
            const res= await axios.post("http://localhost:8001/api/auth/logout")
            const data= await res.data
            if(data.error){
                throw new Error(data.error)
            }
            localStorage.removeItem("chat-user")
            setauthUser(null)
            toast.success('LogOut Successfully')
            
            
        } catch (error) {
            toast.error(error.message);
        }
        finally{
            setLoading(false)
        }
    }


  return {loading,logout}
}

export default UserLogOut

import axios from 'axios'
import { useState } from 'react'
import { toast } from "react-hot-toast";
import { useAuthContext } from '../context/AuthContext'

const UserLogin = () => {
  const [loading,setLoading]=useState(false)

  const {setauthUser}=useAuthContext()



  const login=async({username, password})=>{
    const success = handleInputError({username, password});

    if (!success) return;
    try {

        setLoading(true)
        const res=await axios.post("http://localhost:8001/api/auth/login",{username, password},{
          withCredentials: true,
        })
        const data=await res.data 
        if(data.error){
            throw new Error(data.error)
        }

        localStorage.setItem("chat-user",JSON.stringify(data))
        setauthUser(data)
        toast.success('Login Successfully')

        } 
        catch (error) {
            toast.error('Invalid username or password');
        }
        finally{
            setLoading(false)
        }
      
  }

  return {loading,login}
}

export default UserLogin


function handleInputError({username, password}) {
    if (!username || !password) {
      toast.error("Please fill all fields");
      return false;
    }
    return true;
  }
  
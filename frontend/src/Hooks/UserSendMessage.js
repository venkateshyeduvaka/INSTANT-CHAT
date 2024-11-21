import { useState } from 'react'
import useConveraction from '../zustand/useConveraction'
import {toast} from "react-hot-toast"
import axios from "axios"

const UserSendMessage = () => {
    const [loading,setLoading]=useState(false)
    const {selectedConveraction,messages,setMessages}=useConveraction()

    const sendMessage=async(message)=>{
        setLoading(true)
        try {
            const res=await axios.post(`http://localhost:8001/api/message/send/${selectedConveraction._id}`,{message},{withCredentials: true})
            const data=await res.data 
            if(data.error){
                throw new Error(data.error)
            }
            setMessages([...messages,data])
            
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return{loading,sendMessage}
}

export default UserSendMessage

import { useEffect, useState } from 'react'
import useConveraction from '../zustand/useConveraction'
import {toast} from "react-hot-toast"
import axios from "axios"


const UserGetMessages = () => {
    const [loading,setLoading]=useState(false)
    const {selectedConveraction,messages,setMessages}=useConveraction()

    useEffect(()=>{
        const getMessages=async()=>{
            setLoading(true)
            try {
                const res=await axios.get(`http://localhost:8001/api/message/${selectedConveraction._id}`,{withCredentials: true})
                const data=await res.data 
                if(data.error){
                throw new Error(data.error)
                }
                setMessages(data)
                
            } catch (error) {
                toast.error(error.message)
            }finally{
                setLoading(false)
            }
        }

        if(selectedConveraction?._id) getMessages();

    },[selectedConveraction?._id, setMessages])


    return {loading,messages}
}

export default UserGetMessages

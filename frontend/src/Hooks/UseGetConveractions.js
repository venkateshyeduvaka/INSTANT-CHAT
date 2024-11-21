import React, { useEffect, useState } from 'react'
import {toast} from "react-hot-toast"
import axios from "axios"

const UseGetConveractions = () => {
   const [loading,setLoading]=useState(false)
   const [converactions,setconveractions]=useState([])
   
  useEffect(()=>{
    const getconveractions=async()=>{
        setLoading(true)
        
        try {
            const res=await axios.get("http://localhost:8001/api/users",{withCredentials: true})
            const data=await res.data

            if(data.error){
                throw new Error(data.error)
            }
             console.log("venky-->",data)
            setconveractions(data)
        } catch (error) {
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }
    }

    getconveractions()
   },[])

   return {loading,converactions}
}

export default UseGetConveractions

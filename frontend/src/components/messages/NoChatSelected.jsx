import React from 'react'
import {TiMessages} from "react-icons/ti"
import { useAuthContext } from '../../context/AuthContext'




const NoChatSelected = () => {
  const {authUser}=useAuthContext()
  return (
      <div className='flex items-center justify-center h-full w-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welocome to {authUser.fullname}</p>
        <p>Select a chat start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center'/>
      </div>
    </div>
  )
}

export default NoChatSelected

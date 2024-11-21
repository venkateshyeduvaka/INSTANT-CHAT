import React, { useEffect } from 'react'
import MessagesBox from './MessagesBox'
import MessageInput from './MessageInput'
import { BsFillVinylFill } from 'react-icons/bs'
import NoChatSelected from './NoChatSelected'
import useConveraction from '../../zustand/useConveraction'

const MessageContainer = () => {

  const {selectedConveraction,setSelectedConveraction}=useConveraction()

  useEffect(()=>{
    return ()=>setSelectedConveraction(null)
  },[setSelectedConveraction])

  return (
    <div className='md:min-w-[700px] flex flex-col'>
       {!selectedConveraction ? (<NoChatSelected/>): (<>
         <div className='bg-slate-500 px-4 py-2 mb-2'>
            <span className=' label-text'>TO:</span>
            <span className='text-gray-900  font-bold'>{selectedConveraction.fullname}</span>
         </div>
         <MessagesBox/>
         <MessageInput/>
        </>)}
    </div>
  )
}

export default MessageContainer;


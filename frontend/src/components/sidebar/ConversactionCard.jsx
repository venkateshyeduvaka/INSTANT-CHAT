import React from 'react'
import { FaUser } from "react-icons/fa";
import useConveraction from '../../zustand/useConveraction';
import { useSocketContext } from '../../context/SocketContext';



const ConversactionCard = ({conversation,emoji,lastIdx}) => {
 const {selectedConveraction,setSelectedConveraction}=useConveraction()

 const isSelected=selectedConveraction?._id === conversation._id

 const {onlineUsers}=useSocketContext()
 const isOnline = onlineUsers.includes(conversation._id);

  return (
    
    <>
      <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected?"bg-sky-500":""}`}
      onClick={()=>setSelectedConveraction(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
            <div className='w-12 rounded-full'>
               {/* <FaUser className='w-12 h-8'/>*/}
              <img src={conversation.profilepic} alt=" user avathar" />
            </div>
        </div>
        <div className='flex flex-col flex-1'>
            <div className='flex gap-3 justify-between'>
              <p className='font-bold text-gray-200'>{conversation?.fullname}</p>
              <span className='text-xl'>{emoji}</span>
            </div>
        </div>
      </div>
      {!lastIdx && <div className=' divider my-0 py-0 h-1'/>}
    </>
  )
}

export default ConversactionCard

import React from 'react'
import { useAuthContext } from '../../context/AuthContext';
import useConveraction from '../../zustand/useConveraction';
import { extractTime } from '../../utils/extractTime';


const Message = ({message}) => {

  const {authUser}=useAuthContext()
 // console.log("venky_test_message-->",message.senderid)
 // console.log("venky_test_authuser-->",authUser._id )
  const {selectedConveraction}=useConveraction()
  const fromMe=message.senderid===authUser._id 
  const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilepic : selectedConveraction?.profilepic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  const formattedTime=extractTime(message.createdAt)




  return (
    <div className={`chat ${chatClassName}`}>
      <div className=' chat-image avatar'>
        <div className='w-10 rounded-full'>
              <img alt='Tailwind CSS chat bubble component' src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
      <div className={`chat-footer opacity-50 text-xs flex gap-1 items-center`}>{formattedTime}</div>
    </div>
  )
}

export default Message

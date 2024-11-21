import React from 'react'
import { BiLogOut } from "react-icons/bi";
import UserLogOut from '../../Hooks/UserLogOut';


const LogOut = () => {
   const {loading,logout}=UserLogOut()
  return (
    <div className=' mt-auto'>
      {!loading?(<BiLogOut onClick={logout} className='h-8 w-8 text-white cursor-pointer'/>):(<span className='loading loading-spinner'></span>)}
    </div>
  )
}

export default LogOut

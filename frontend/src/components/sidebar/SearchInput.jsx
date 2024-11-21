import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useConveraction from '../../zustand/useConveraction';
import UseGetConveractions from '../../Hooks/UseGetConveractions';
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [search,setSearch]=useState("")
 
  const {setSelectedConveraction} =useConveraction()
  const {converactions}=UseGetConveractions()


  const handelSubmit=(e)=>{
     e.preventDefault()
     if(!search) return 
     if(search.length<3){
      return toast.error("Search term must be at least 3 characters long")
     }
     const conversation = converactions.find((c) => c.fullname.toLowerCase().includes(search.toLowerCase()));
     if(conversation){
      setSelectedConveraction(conversation)
      setSearch("")
     }
     else{
      toast.error("No such user found!")
     }
  }


  return (
    <form onSubmit={handelSubmit} className='flex items-center gap-2'>
       <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search...' className=' input input-bordered rounded-full'/>
       <button type="submit" className='btn btn-circle bg-sky-500 text-white'>
          <IoSearchSharp className='h-6 w-6 outline-none' />
       </button>
    </form>
  )
}

export default SearchInput

import React, { useState } from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import UserSignUp from '../Hooks/UserSignUp'

const SignupPage = () => {
   
  const [registerdata,setRegisterData]=useState({
    fullname:"",
    username:"",
    password:"",
    confirmpassword:"",
    gender:""
  })

  const { signup, loading } = UserSignUp(); //custome hook

  const handelgenderChange=(gender)=>{
    setRegisterData({...registerdata,gender})
  }


  const handelSubmit=async(e)=>{
    e.preventDefault()
    await signup(registerdata)
  }



  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <h1 className=' text-3xl font-semibold text-center text-gray-300'>Signup <span className=' text-blue-500'>ChatApp</span></h1>

      <form onSubmit={handelSubmit}>

          <div>
            <label className='label p-2'>
              <span className=' text-base label-text'>Fullname</span>
            </label>
            <input type='text' placeholder='Enter Full Name' className='w-full input input-bordered h-10'
             value={registerdata.fullname}
             onChange={(e)=>setRegisterData({...registerdata,fullname:e.target.value})}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className=' text-base label-text'>Username</span>
            </label>
            <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10'
            value={registerdata.username}
            onChange={(e)=>setRegisterData({...registerdata,username:e.target.value})}/>
          </div>

          <div>
              <label className='label'>
						     <span className='text-base label-text'>Password</span>
					    </label>
              <input type='password' placeholder='Enter Password' className='w-full input input-bordered h-10'
              value={registerdata.password}
              onChange={(e)=>setRegisterData({...registerdata,password:e.target.value})}
              />
          </div>

          <div>
              <label className='label'>
						     <span className='text-base label-text'>Confirm Password</span>
					    </label>
              <input type='password' placeholder='Confirm Password' className='w-full input input-bordered h-10'
              value={registerdata.confirmpassword}
              onChange={(e)=>setRegisterData({...registerdata,confirmpassword:e.target.value})}
              />
          </div>
          

          {/*GENDER CHECK BOX GOES HERE */}
          <GenderCheckBox  onCheckBoxChange={handelgenderChange} selectedGender={registerdata.gender}/>
           
          <Link to='/login' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>Already have an account?</Link>   
          
          <div>
					  <button className='btn btn-block btn-sm mt-2' disabled={loading}>
              {loading?<span className='loading loading-spinner'></span>:"Sign Up"}
            </button>
				  </div>
     
      </form>
       

      </div>
    </div>
  )
}


export default SignupPage

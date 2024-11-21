import React from 'react'
import SideBar from '../components/sidebar/SideBar'
import MessageContainer from '../components/messages/MessageContainer'

const HomePage = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] w-4/5 rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
	    <SideBar/>
      <MessageContainer/>
		</div>
  )
}

export default HomePage

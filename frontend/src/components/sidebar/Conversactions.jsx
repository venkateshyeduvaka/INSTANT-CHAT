import React from 'react'
import ConversactionCard from './ConversactionCard'
import UseGetConveractions from '../../Hooks/UseGetConveractions'
import {getRandomEmoji} from "../../utils/emojis"

const Conversactions = () => {

  const  {loading,converactions}=UseGetConveractions()
 //console.log("sidebar-->",converactions)

  return (
    <div className='py-2 flex flex-col overflow-auto'>

      {converactions.map((conversation,idx)=>(
        <ConversactionCard 
        key={conversation._id} 
        conversation={conversation}
        emoji={getRandomEmoji()}
        lastIdx={idx === converactions.length-1}
        />))

      }

      {loading? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  )
}



export default Conversactions

import React from 'react'
import ChatBoard from './ChatBoard'
import ChatHeader from '../components/Header'
import { useState } from 'react'
ChatHeader

function Home() {
  const [current_user, setCurrentUser] = useState(null)
  const [senderId, setSenderId] = useState(null)
   
  

  return (
    <>
    <div className='max-h-screen min-h-screen grid grid-rows-[10%_90%]'>
      <ChatHeader setCurrentUser={setCurrentUser} setSenderId={setSenderId}/>
     <ChatBoard current_user={current_user} senderId={senderId}/>
    </div>
    </>
  )
};

export default Home
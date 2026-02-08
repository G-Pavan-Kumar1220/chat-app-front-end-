import React from 'react'
import LoginPage from './Pages/LoginPage'
import { Routes,Route } from 'react-router-dom'
import ProtectionRoute from './protectionRoutes/ProtectionRoute'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      {/* {protect routes} */}
      <Route element={<ProtectionRoute/>}>
         <Route path='/home' element={<Home/>}/>

      </Route>
      {/* 404 Route*/}
      <Route path="*" element={<NotFound/>}/>

    </Routes>
    </>
  )
}

export default App
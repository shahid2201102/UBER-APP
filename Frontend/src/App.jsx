import React, { useContext }  from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import Riding from './pages/Riding'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserLogout from './pages/UserLogout'
import { UserDataContext } from './context/UserContext'
import UserProtectWrapper from './pages/UserProtectWrapper'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainRiding from './pages/CaptainRiding'
import 'remixicon/fonts/remixicon.css'



const App = () => {

  return (
      <Routes>
        <Route path='/' element={<Start/>} />
        <Route path='/home' element={
          <UserProtectWrapper>
              <Home/>
          </UserProtectWrapper>} />
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/riding' element={<Riding/>} />
        <Route path='/captain-riding' element={<CaptainRiding/>}/>

        <Route path='/signup' element={<UserSignup/>} />
        <Route path='/captain-login' element={<CaptainLogin/>} />
        <Route path='/captain-signup' element={<CaptainSignup/>} />
        <Route path='/user/logout' element={
          <UserProtectWrapper>
              <UserLogout/>
          </UserProtectWrapper>} />
        <Route path='/captain-home' element={
          <CaptainProtectWrapper>
            <CaptainHome/>
          </CaptainProtectWrapper>
        } />
      </Routes>
  )
}

export default App
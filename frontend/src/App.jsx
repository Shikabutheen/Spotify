
import React from 'react'
import Login from './pages/login'
import Home from './pages/Home'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './pages/reg'
import { UserData } from './context/user'
import Loading from './component/loadind'
import Admin from './pages/Admin.jsx'
import ListPlay from './pages/ListPlay.jsx'

import Albumlist from './pages/Albumlist.jsx'


const App = () => {
  const{loading,isAuth}=UserData()
  return (
    <>
    {
      loading?(
        <Loading/>
      ):(
        <BrowserRouter>
    <Routes>
        <Route path='/' element={isAuth ? <Home/> : <Login/>} />
      <Route path='/playlist' element={isAuth ? <ListPlay /> : <Login />} />
      <Route path='/album/:id' element={isAuth ? <Albumlist /> : <Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/reg' element={<Register />} />
      <Route path='/admin' element={<Admin />} />

      </Routes>
    
    </BrowserRouter>
      )
    }
   
    </>
  )
}

export default App
import React from 'react'
import { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import Login from './Pages/Login'
import Sidebar from './component/sidebar'
import RegisterEmployee from './component/CreateEmploye'
import LayoutPage from './Pages/Layout'
import Pembaruan from './component/Update'
import DeleteAccount from './component/DeleteEmployee'

function App() {
return (
    <>
     <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/layout' element={<LayoutPage/>}/>
      <Route path='/sidebar' element={<Sidebar/>}/>
      <Route path='/sidebar/register_employee' element={<RegisterEmployee/>}/>
      <Route path='/sidebar/pembaruan' element={<Pembaruan/>}/>
      <Route path='/sidebar/delete' element={<DeleteAccount/>}/>
     </Routes>
    </>
  )
}

export default App

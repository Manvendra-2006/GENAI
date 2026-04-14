import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './Auth/pages/Login'
import SignUp from './Auth/pages/SignUp'

const App = () => {
  return (
    <div>      
      <BrowserRouter>
      <Routes>
        <Route element=<h1>home page</h1> path="/"/>
        <Route element={<Login/>} path='/login'/>
        <Route element={<SignUp/>} path='/signup'/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
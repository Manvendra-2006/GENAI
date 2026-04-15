import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './Auth/pages/Login'
import SignUp from './Auth/pages/SignUp'
import Protected from './Auth/components/Protected'

const App = () => {
  return (
    <div>      
      <BrowserRouter>
      <Routes>
        <Route element={<Protected><h1>Home Page</h1></Protected> }path="/"/>
        <Route element={<Login/>} path='/login'/>
        <Route element={<SignUp/>} path='/signup'/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
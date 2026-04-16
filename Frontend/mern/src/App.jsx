import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './Auth/pages/Login'
import SignUp from './Auth/pages/SignUp'
import Protected from './Auth/components/Protected'
import Home from './interview/pages/Home'
import Interview from './interview/pages/interview'

const App = () => {
  return (
    <div>      
      <BrowserRouter>
      <Routes>
        <Route element={<Protected><Home/></Protected> }path="/"/>
        <Route element={<Login/>} path='/login'/>
        <Route element={<SignUp/>} path='/signup'/>
        <Route element={<Interview/>} path="/interview"/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
import React from 'react'
import { Route,Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
function App() {
  return (
    <Routes>
      <Route path="SignIn" element={<SignIn />} />
      <Route path="SignUp" element={<SignUp />} />
   </Routes>
  )
}

export default App


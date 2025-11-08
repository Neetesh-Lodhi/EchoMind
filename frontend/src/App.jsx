import React from 'react'
import { Route,Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Customize from './pages/Customize'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { userDataContext } from './context/UserContext'
import Customize2 from './pages/Customize2'
import { useNavigate } from 'react-router-dom'
function App() {
  const {userData,setUserData} = useContext(userDataContext);
  return (
    <Routes>
      <Route
        path="/"
        element={
          userData?.assistantImage && userData?.assistantName ? (
            <Home />
          ) : (
            <Navigate to={"/customize"} />
          )
        }
      />
      <Route
        path="SignUp"
        element={!userData ? <SignUp /> : <Navigate to={"/"} />}
      />
      <Route
        path="SignIn"
        element={!userData ? <SignIn /> : <Navigate to={"/"} />}
      />
      <Route
        path="customize"
        element={userData ? <Customize /> : <Navigate to={"/SignIn"} />}
      />
      <Route
        path="customize2"
        element={userData ? <Customize2 /> : <Navigate to={"/SignIn"} />}
      />
    </Routes>
  );
}

export default App


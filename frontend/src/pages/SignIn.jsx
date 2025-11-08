import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import bg from "../assets/authBg.png"
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { userDataContext } from '../context/UserContext';


import axios from "axios";
function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { serverUrl, userData, setUserData } = useContext(userDataContext);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[loading,setLoading] = useState(false)

  const handleSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/SignIn`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
     setUserData(result.data)
      setLoading(false)
      navigate("/");
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
      setUserData
      setLoading(false)
    }
  }
  return (
    <div
      className="w-full h-[100vh] bg-cover flex justify-center items-center "
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        className="w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur shadow-lg 
      shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]"
        onSubmit={handleSignIn}
      >
        <h1 className="text-white text-[30px] font-semibold mb-[30px]">
          SignIn to <span className="text-blue-400">EchoMind</span>
        </h1>
     
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          className="w-full h-[60px] outline-none border-2 border-white 
        bg-transparent text-white placeholder-grey-300 px-[20px] py-[10px] rounded-[10px] text-[18px]"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white px-[20px] py-[10px] rounded-[10px] text-[18px] relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            className="w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {!showPassword && (
            <IoEye
              className="absolute top-[18px] right-[20px] text-white w-[25px] h-[25px] cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
          {showPassword && (
            <IoEyeOff
              className="absolute top-[18px] right-[20px] text-white w-[25px] h-[25px] cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>
        <button
          className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold 
        bg-white rounded-full text-[19px]"
          disabled={loading}
        >{loading ? "loading..." : "Sign In"}
         
        </button>
        <p
          className="text-white text-[18px] cursor-pointer"
          onClick={() => navigate("/SignUp")}
        >
          Want To Create An Account ?{" "}
          <span className="text-blue-400">Sign Up</span>
        </p>
      </form>
    </div>
  );
}

export default SignIn

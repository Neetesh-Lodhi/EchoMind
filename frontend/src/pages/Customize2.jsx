import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";

function Customize2() {
  const { userData, backendImage, selectedImage, serverUrl, setUserData } =
    useContext(userDataContext);
  const [assistantName, setAssistantName] = useState(
    userData?.assistantName || ""
  );
  const navigate = useNavigate();

  const handleUpdateAssistant = async () => {
    try {
      console.log("serverUrl:", serverUrl);

      const formData = new FormData();
      formData.append("assistantName", assistantName);
      if (backendImage instanceof File) {
        formData.append("assistantImage", backendImage);
      } else {
        formData.append("imageUrl", selectedImage);
      }

      const result = await axios.post(
        `${serverUrl}/api/user/update`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Response:", result.data);
      setUserData(result.data);
      navigate("/dashboard"); // optional navigation after update and create assistent
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex justify-center items-center flex-col p-[20px]">
      <h1 className="text-white text-[30px] font-bold text-center mb-[30px]">
        Enter Your <span className="text-blue-200">Assistant Name</span>
      </h1>
      <input
        type="text"
        placeholder="eg. Neetesh"
        className="w-full max-w-[600px] h-[60px] outline-none border-2 border-white 
        bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
        required
        onChange={(e) => setAssistantName(e.target.value)}
        value={assistantName}
      />
      {assistantName && (
        <button
          className="min-w-[299px] h-[60px] mt-[30px] text-black font-semibold 
          bg-white rounded-full text-[19px] cursor-pointer"
          onClick={handleUpdateAssistant}
        >
          Finally Create Your Assistant
        </button>
      )}
    </div>
  );
}

export default Customize2;

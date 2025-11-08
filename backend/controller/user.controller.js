import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("getCurrentUser Error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAssistant = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;
    if (!assistantName) {
      return res.status(400).json({ message: "Assistant name is required" });
    }

    let assistantImage;

    if (req.file) {
      assistantImage = await uploadOnCloudinary(req.file.path);
    } else if (imageUrl) {
      assistantImage = imageUrl;
    } else {
      return res.status(400).json({ message: "No assistant image provided" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { assistantName, assistantImage },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("updateAssistant Error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

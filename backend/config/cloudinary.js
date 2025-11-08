import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()

export const uploadOnCloudinary = async (filepath) => {
          cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
          });

          try {
                    const uploadResult = await cloudinary.uploader.upload(filepath) 
                    fs.unlinkSync(filepath)
                    return uploadResult.secure_url
                        
          }catch(error) {
                    fs.unlinkSync(filepath) 
               console.log(error,"cloudinary error")   
          }
}

// export default uploadOnCloudinary
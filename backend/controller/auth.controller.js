import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import genToken from "../config/token.js"

export const signUp = async (req, res) => {
          try {
                    const { name, email, password } = req.body;
                    const existEmail = await User.findOne({ email });
                    if (existEmail) {
                              return res.status(400).json({message:"Email already exist"})
                    }

                    if (password.length < 6) {
                              return res.status(400).json({message:"Password must be at least 6 characters"})
                    }

                    const hashedPassword = await bcrypt.hash(password, 10); 

                    const user = await User.create({
                              name,
                              email,
                              password:hashedPassword,
                    })

                    const token = await genToken(user._id);

                    res.cookie("token", token, {
                              httpOnly: true,
                              maxAge: 1000 * 60 * 60 * 24,
                              samesite: "strict",
                              secure:false
                    })

                    return res.status(201).json(user);
              
          } catch (error) {
                    return res.status(500).json({message:"singUp failed"})
          }
}


export const SignIn = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                      return res.status(400).json({message:"Email Not Found"})
            }
  
            const isMatched = await bcrypt.compare(password, user.password);
            if (!isMatched) {
                      return res.status(400).json({message:"Password is Incorrect"})
            }
                  const token = await genToken(user._id);
                  res.cookie("token", token,{
                            httpOnly: true,
                            maxAge: 1000 * 60 * 60 * 24,
                            samesite: "strict",
                            secure:false,
                  })

            return res.status(200).json(user)
        } catch (error) {
          return res.status(500).json({ message: "Login Failed" });
        }
}

export const logOut = async (req, res) => {
         try {
           res.clearCookie("token");
           return res.status(200).json({message:"Logout successfully"})
         } catch (error) {
          return res.status(500).json({ message: "Logout error" });
         }
 }
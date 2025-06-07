import express from 'express'
import { signUp,SignIn,logOut } from '../controller/auth.controller.js';
const authRouter = express.Router();

authRouter.post("/signUp", signUp);
authRouter.post("/SignIn", SignIn);
authRouter.get("/logOut", logOut);

export default authRouter
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import cors from 'cors'

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
          origin: "http://localhost:5173",
          credentials:true,
}))

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
          connectDb()
          console.log(`server is running on port ${port}`)
})
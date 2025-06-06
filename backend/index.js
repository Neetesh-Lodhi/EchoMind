import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js';
dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
     res.send("Hii")     
})

app.listen(port, () => {
          connectDb()
          console.log(`server is running on port ${port}`)
})
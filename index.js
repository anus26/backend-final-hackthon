import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import connectDB from "./src/db/index.js"
import cors  from "cors"
import  userroutes from "./src/routes/user.routes.js"
import cookieParser  from 'cookie-parser'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const app = express();
app.use(cors())
app.use(express.json());
app.use(cookieParser())
const JWT_TOKEN_SECRET=process.env.JWT_TOKEN_SECRET

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFudXNyYXphMjY4QGdtYWlsLmNvbSIsImlhdCI6MTczNzc3NTY0MH0.Yv6xDJMEhLHMh2HA6qTTfE7FVfPaQqgii2mmLxB893Q"
const encryptpassword= "$2b$10$rD9yjoCU3ZgMZk4JOydvXO5HE9z3Pzo7FCNwCLi1p9eC4FkLmu.f."

app.post("/encryptpassword",(req,res)=>{
    const {password}=req.body
    
        bcrypt.hash(password, 10, function(err, hash) {
            // Store hash in your password DB.
            if(err)return res.status(402).json({message:"password not correct"})
                res.json({password:hash})
            });
            
          })
         app.post("/checkedpassword",(req,res)=>{
            const {password}=req.body
            bcrypt.compare(password, encryptpassword, function(err, result) {
              if(err) return res.status(402).json({message:"error"})
                if(result) return res.json({message:"password is correct"})
   res.status(404).json({message:"incorrect password"})
})   // checkedpassword
        ;
 })
// genreatetoken
app.post("/genreatetoken",(req,res)=>{
    const {email}=req.body
    const token = jwt.sign({email },JWT_TOKEN_SECRET ,);
    res.json(token)
})

// checkedtokend
app.post("/checkedtoken",(req,res)=>{
  jwt.verify(token, process.env.JWT_TOKEN_SECRET, function(err, decoded) {
    if(err) return res.json({message:"error occured"})
    console.log(decoded) // bar
  res.json(decoded)
  });
})



app.use('/api/v1',userroutes)

connectDB()

  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed!!!", err);
  });
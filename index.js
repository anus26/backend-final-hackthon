import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import connectDB from "./src/db/index.js"
import cors  from "cors"
import  beneficiaryroutes from "./src/routes/beneficiary.routes.js"



const app = express();
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})





app.use('/api/v1',beneficiaryroutes)

connectDB()

  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed!!!", err);
  });
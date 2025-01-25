import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
 fullname:{
  type:String,
  required:true,
 },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
 
},
  {
    timestamps:true,
  }
  
);
userSchema.pre("save",async function(next){
  if(!this.isModified("password"))return next()
    this.password=await bcrypt.hash (this.password,10)
  next()
})
export default mongoose.model("Users", userSchema);
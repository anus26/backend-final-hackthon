import mongoose from "mongoose";
import bcrypt from "bcrypt"
const beneficiarySchema = new mongoose.Schema({
 cnic:{
  type:String,
  required:true,
  unique:true,
 },
  name: {
    type: String,
    required: true,
    
  },
  phone: {
    type: String,
    required: Number,
  },
 address:{
 type:String,
 required:true,
 },
 purpose:{
  type:String,
  required:true,
 },
 token:{
  type:String,
  unique:true,
 },
 department:{
  type:String,
  required:true,
 },
 status:{
  type:String,
  required:true,
 },

 remarks:{
  type:String,
 }

 
},
  {
    timestamps:true,
  }
  
);
// userSchema.pre("save",async function(next){
//   if(!this.isModified("password"))return next()
//     this.password=await bcrypt.hash (this.password,10)
//   next()
// })
export default mongoose.model("Beneficiary", beneficiarySchema);
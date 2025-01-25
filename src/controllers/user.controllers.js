import User from "../models/user.models.js";
import jwt from 'jsonwebtoken'



const generateAccessToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.ACCESS_JWT_TOKEN_SECRET, { expiresIn: '6h' });
}
const generateRefreshToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.REFRESH_JWT_TOKEN_SECRET, { expiresIn: '7d' });
}


const registerUser = async (req, res) => {
    const { fullname,email, password,role } = req.body;
    
    if (!fullname) return res.status(400).json({ message: "fullname required" });
    if (!email) return res.status(400).json({ message: "email required" });
    if (!password) return res.status(400).json({ message: "password required" });
    if(!role) return res.status(400).json({message:"role is define"})
    const user = await User.findOne({ email: email });
    if (user) return res.status(401).json({ message: "user already exist" });
    const createUser = await User.create({
    fullname,
      email,
      password,
      role
    });
    res.json({ message: "user registered successfully", data: createUser });
  };

  export {registerUser}
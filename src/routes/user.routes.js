import  express from "express";
import { longinUser, registerUser,logoutUser,refreshToken} from '../controllers/user.controllers.js'

const router=express.Router()
router.post('/register',registerUser)
router.post('/login',longinUser)
router.post("/logout", logoutUser);
router.post("/refresh", refreshToken);
export default router;
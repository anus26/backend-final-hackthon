import  express from "express";
import { longinUser, registerUser} from '../controllers/user.controllers.js'

const router=express.Router()
router.post('/register',registerUser)
router.post('/login',longinUser)
export default router;
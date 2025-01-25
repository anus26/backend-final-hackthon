import  express from "express";
import { Beneficiariesgetall, Beneficiaryregister ,getBeneficiarybycnic} from "../controllers/benieficiary.controllers.js";

const router=express.Router()


router.post('/register',Beneficiaryregister)
router.get('/getall', Beneficiariesgetall);
router.get('/getbeneficiary/:cnic', getBeneficiarybycnic)
export default router;
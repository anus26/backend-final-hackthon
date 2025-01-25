import  express from "express";
import { Beneficiariesgetall, Beneficiaryregister ,deletebeneficiary,getBeneficiarybycnic,updateBeneficiaries} from "../controllers/benieficiary.controllers.js";

const router=express.Router()


router.post('/register',Beneficiaryregister)
router.get('/getall', Beneficiariesgetall);
router.get('/getbeneficiary/:cnic', getBeneficiarybycnic)
router.put('/update/:cnic', updateBeneficiaries);
router.delete('/delete/:cnic',deletebeneficiary)


export default router;
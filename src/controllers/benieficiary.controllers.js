import Beneficiary from "../models/beneficiary.models.js";

const Beneficiaryregister = async (req, res) => {
  const { cnic, name, phone, address, purpose, department ,status} = req.body; 
  if (req.is('json') && (!req.body || Object.keys(req.body).length === 0)) {
    return res.status(400).json({ error: 'Request body is empty or invalid' });
  }
  try {
    const existingBeneficiary = await Beneficiary.findOne({ cnic });
    if (existingBeneficiary) {
      return res.status(400).json({ message: "Beneficiary with this CNIC already exists" });
    }

    // Generate a unique token for the beneficiary
    const token = `Token-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const beneficiary = new Beneficiary({
      cnic,
      name,
      phone,
      address,
      purpose,
      department,
      token,
      status
    });

    await beneficiary.save();
    res.status(201).json({ message: "Beneficiary registered successfully", beneficiary });
  } catch (error) {
    console.error("Error message", error);
    res.status(500).json({ message: "Server error" });
  }
}; 

// get all beeficiary
// Get all beneficiaries
const Beneficiariesgetall = async (req, res) => {
    try {
      const beneficiaries = await Beneficiary.find();
      res.status(200).json({ message: "Fetched all beneficiaries successfully",data: beneficiaries });
    } catch (error) {
      console.error("Error fetching beneficiaries:", error.message);
      res.status(500).json({ message: "Server error while fetching beneficiaries" });
    }
  };
// get beneficiary by cnic
const getBeneficiarybycnic=async(req,res)=>{
    const {cnic}=req.params
    try {
        const beneficiary=await Beneficiary.findOne({cnic})
        if (!beneficiary) return res.status(404).json({message:"beneficiary not found"})
res.status(200).json({message:"get by cnic beneficiary",beneficiary})
    } catch (error) {
        console.error("error fetching benefi",error);
        res.status(500).json({message:"server error"})
        
    }
}

export { Beneficiaryregister,Beneficiariesgetall,getBeneficiarybycnic};

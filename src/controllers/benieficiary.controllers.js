import Beneficiary from "../models/beneficiary.models.js";
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';
const Beneficiaryregister = async (req, res) => {
  const { cnic, name, phone, address, purpose, department ,status} = req.body; 
//   if (req.is('json') && (!req.body || Object.keys(req.body).length === 0)) {
//     return res.status(400).json({ error: 'Request body is empty or invalid' });
//   }
  if (!cnic || !name || !phone || !address || !purpose || !department || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existingBeneficiary = await Beneficiary.findOne({ cnic });
    if (existingBeneficiary) {
      return res.status(400).json({ message: "Beneficiary with this CNIC already exists" });
    }

    // Generate a unique token for the beneficiary
    // const token = `Token-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const token = uuidv4();

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
     // Generate QR code for the token
     const qrCodeData = await QRCode.toDataURL(token); 
    res.status(201).json({ message: "Beneficiary registered successfully", beneficiary ,token,QRCode:qrCodeData});
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

// update beneficiaries
const updateBeneficiaries = async (req, res) => {
    const { cnic } = req.params;
    const { status, remarks } = req.body; // Assume you're updating these fields
  
    // Validate status or remarks if they are provided
    if (!status && !remarks) {
      return res.status(400).json({ message: "At least one field (status or remarks) must be provided for update." });
    }
  
    try {
      // Only update the fields that are provided in the request body
      const updatedFields = {};
      if (status) updatedFields.status = status;
      if (remarks) updatedFields.remarks = remarks;
  
      const beneficiary = await Beneficiary.findOneAndUpdate(
        { cnic },
        { ...updatedFields, updatedAt: Date.now() }, // Update status, remarks and set the updatedAt field
        { new: true }
      );
  
      if (!beneficiary) {
        return res.status(404).json({ message: "Beneficiary not found." });
      }
  
      res.status(200).json({ message: "Beneficiary updated successfully.", beneficiary });
  
    } catch (error) {
      console.error("Error updating beneficiary:", error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };
  
  const deletebeneficiary=async(req,res)=>{
    const {cnic}=req.params
    try {
        const beneficiary=await Beneficiary.findOneAndDelete({cnic})
        if(!beneficiary)return res.status(404).json({message:"beneficiary not found"})
            res.status(200).json({message:"beneficiary deleted successfully"})
    } catch (error) {
        console.error('error updating',error);
        
    }
  }

export { Beneficiaryregister,Beneficiariesgetall,getBeneficiarybycnic,updateBeneficiaries,deletebeneficiary};

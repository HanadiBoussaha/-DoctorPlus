import Booking from '../models/BookingSchema.js';
import Doctor from '../models/DoctorSchema.js';

export const updateDoctor = async(req,res)=>{
    const id = req.params.id

    try {
        
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, {$set:req.body}, {new:true})

        res.status(200).json({success:true, message:'Successfuly updated', data:updatedDoctor})
    } catch (error) {
        res.status(500).json({success:false, message:'failed to update'});
        
    }

};

//delete

export const deleteDoctor = async(req,res)=>{
    const id = req.params.id

    try {
        
        await Doctor.findByIdAndDelete(id, );

        res.status(200).json({success:true, message:'Successfuly deleted'})
    } catch (error) {
        res.status(500).json({success:false, message:'failed to delete'});
        
    }

};


//get

export const getSingleDoctor = async(req,res)=>{
    const id = req.params.id

    try {
        
        const doctor = await Doctor.findById(id).populate('reviews').select("-password");

        res.status(200).json({success:true, message:'doctor found', data:doctor})
    } catch (error) {
        res.status(404).json({success:false, message:'no doctor found'});
        
    }

};

//get all

export const getAllDoctor = async(req,res)=>{
    
    try {
        
        const doctors = await Doctor.find({}).select("-password");

        res.status(200).json({success:true, message:'doctor found', data:doctors})
    } catch (error) {
        res.status(404).json({success:false, message:'not found'});
        
    }

};


export const getDoctorProfile = async(req,res)=>{
    const id = req.params.id;
    console.log("User ID:", id);

    try {
        const doctor = await Doctor.findById(id);

        if (!doctor) {
            return res.status(404).json({success:false, message:'Doctor not found'})
        }
        const {password, ...rest} = doctor._doc;
        const appointments = await Booking.find({doctor: id})

        res.status(200).json({success:true, message:'Profile info is getting', data:{ ...rest, appointments }})
    } catch (err) {
        res.status(500).json({success:false, message:'Something went wrong, cannot get'});
        
    }
}
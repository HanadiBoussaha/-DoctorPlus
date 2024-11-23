import User from '../models/UserSchema.js';
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const updateUser = async(req,res)=>{
    const id = req.params.id
    console.log(id);

    try {
        
        const updatedUser = await User.findByIdAndUpdate(id, {$set:req.body}, {new:true})

        res.status(200).json({success:true, message:'Successfuly updated', data:updatedUser})
    } catch (error) {
        res.status(500).json({success:false, message:'failed to update'});
        
    }

};

//delete

export const deleteUser = async(req,res)=>{
    const id = req.params.id

    try {
        
        await User.findByIdAndDelete(id);

        res.status(200).json({success:true, message:'Successfuly deleted'})
    } catch (error) {
        res.status(500).json({success:false, message:'failed to delete'});
        
    }

};


//get

export const getSingleUser = async(req,res)=>{
    const id = req.params.id
    console.log(id)
    try {
        
        const user = await User.findById("6614669b8abe7a03e46b6abe")
        console.log(user);
        res.status(200).json({success:true, message:'user found', data:user})
    } catch (error) {
        res.status(404).json({success:false, message:'no user found'});
        
    }

};

//get all

export const getAllUser = async(req,res)=>{
    
    try {
        
        const users = await User.find({}).select("-password");

        res.status(200).json({success:true, message:'users found', data:users})
    } catch (error) {
        res.status(404).json({success:false, message:'not found'});
        
    }

};


export const getUserProfile = async (req, res) => {
    const id = req.params.id; // Utilisez req.params.id au lieu de eq.params.id

    // Affiche l'ID dans la console
    console.log("User ID:", id);

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const { password, ...rest } = user._doc;

        res.status(200).json({ success: true, message: 'Profile info is getting', data: { ...rest } });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Something went wrong, cannot get' });
    }
};


export const getMyAppointments = async(req,res)=>{
    try {
        //step1: retrieve appointments from booking from for specific user
        const bookings = await Booking.find({user:req.params.id})
        //step3: extract doctor ids appointment bookings
        const doctorIds = bookings.map(el=>el.doctor.id)
        //step3: retrieve doctors using doctor ids 
        const doctors = await Doctor.find({_id: {$in:doctorIds}}).select('-password')

        res.status(200).json({success:true, message:'Appoinments are getting', data:doctors})
    } catch (err) {
        res.status(500).json({success:false, message:'Something went wrong, cannot get'});
    }

};
import Rdv from "../models/RdvSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const createRdv = async (req, res) => {
    try {
        const { sujet, message, date } = req.body;
        const doctorId = req.params.doctorId;
        const userId = req.userId;

        if (!sujet || !message || !date) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newRdv = new Rdv({
            doctor: doctorId,
            user: userId,
            sujet,
            message,
            date
        });
    await newRdv.save();
    res.status(200).json({ success:true, message:'Appointment successfully created' });
    
} catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:'Internal server error' });
}
};

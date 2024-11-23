import mongoose from "mongoose";
import Doctor from "./DoctorSchema.js";
const rdvSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor", 
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    sujet: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Rdv", rdvSchema);

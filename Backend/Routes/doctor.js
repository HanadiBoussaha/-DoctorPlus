import express from 'express';
import { updateDoctor, deleteDoctor, getAllDoctor, getSingleDoctor, getDoctorProfile } from '../Controllers/doctorController.js';

import {authenticate, restrict} from "../auth/verifyToken.js";

import reviewRouter from './review.js'

const router = express.Router();

//nested route
router.use('/:doctorId/reviews', reviewRouter)

router.get('/:id',authenticate, restrict(["doctor"]), getSingleDoctor);
router.get('/',authenticate, restrict(["doctor"]), getAllDoctor);
router.put('/:id',authenticate, restrict(["doctor"]),  updateDoctor);
router.delete('/:id',authenticate, restrict(["doctor"]),  deleteDoctor);

router.get('/profile/me/:id', authenticate, restrict(["doctor"]), getDoctorProfile)

export default router;
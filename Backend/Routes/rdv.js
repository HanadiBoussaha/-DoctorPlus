import express from "express";
import { createRdv } from "../Controllers/RdvController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.post('/rdv/:id', authenticate, restrict(['patient']), createRdv);

export default router;

import express from "express";

import { checkPermission } from "../middleware/checkAuth";
import { AllUser, OneUser } from "../controler/user";
const router = express.Router();
router.get('/user/:id', OneUser)
router.get('/user', AllUser)
export default router;
import express from "express";
import { singin, singup } from "../controler/auth";

const router = new express.Router();
router.post('/singup',singup)
router.post('/singin', singin)

export default router
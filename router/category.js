import express from "express";
import { AllCategory, CreateCategory, DeleteCategory, OneCategory, UpdateCategory } from "../controler/category";
import { checkPermission } from "../middleware/checkAuth";
const router = express.Router();
router.get('/categorys', AllCategory)
router.get('/categorys/:id', OneCategory)
router.delete('/categorys/:id', checkPermission, DeleteCategory)
router.post('/create', checkPermission, CreateCategory)
router.put('/categorys/:id', checkPermission, UpdateCategory)
export default router;
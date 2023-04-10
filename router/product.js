import express from "express";
import { OneProduct, AllProduct, DeleteProduct, UpdateProduct, CreateProduct } from "../controler/product";
import { checkPermission } from "../middleware/checkAuth";


const router = express.Router();
router.get('/products', AllProduct)
router.get('/products/:id', OneProduct)
router.post('/add',checkPermission, CreateProduct),
// router.post('/upload', upload)
router.delete('/products/:id', checkPermission, DeleteProduct)
router.put('/products/:id', UpdateProduct)

export default router;
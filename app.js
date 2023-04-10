
import express from "express"
import mongoose from "mongoose";


import routerProduct from "./router/product";
import routerUser from "./router/auth"
import cors from "cors"
import Routercategory from '../src/router/category'
import RouterUploadImage from '../src/router/uploadImage'
import RouterUser from '../src/router/user'
const app = express();
app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use('/api', routerProduct)
app.use('/api', Routercategory)
app.use('/api', routerUser)
app.use('/api', RouterUploadImage)
app.use('/api', RouterUser)
mongoose.connect("mongodb://127.0.0.1:27017/we17301");

export const viteNodeApp =app

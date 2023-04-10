import express from "express";
import { uploadImage } from "../controler/uploadeClouddinary";
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from "multer";
const router = new express.Router();
cloudinary.config(
    {
        cloud_name: "dw6wgytc3",
        api_key: "652736835559993",
        api_secret: "naO0s3jIfv3sGxEYTbt1KiYp6Vo"
    }
)

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "NODEJS",
        format: "jpg",
    },
});
const upload = multer({ storage: storage })
console.log("quan")
router.post('/upload', upload.array("images", 10), uploadImage)

export default router
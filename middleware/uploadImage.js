import {v2 as cloudinary} from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

export const UploadMulter=(res,req,next)=>{
     cloudinary.config(
        {
             cloud_name: "demo_upload",
             api_key:"652736835559993",
             api_secret:"naO0s3jIfv3sGxEYTbt1KiYp6Vo"
        }
     )
     const storage= new CloudinaryStorage({
        cloudinary: cloudinary,
        params:{
            folder :"NODEJS",
            format: "png",
            public_id: "some_unique_id"
        }

     })
     const upload = multer({storage: storage})
     req.files=upload.array("images",10)
     next()
}
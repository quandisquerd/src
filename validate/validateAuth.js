import Joi from "joi";
export const validateSingup = Joi.object({
    name:Joi.string().required().messages({
        "string.empty":"Ten khong duoc de trong",
        "any.required":"Truong ten phai bat buoc co"
    }),
    email:Joi.string().email().required().messages({
        "string.empty":"Email khong duoc de trong",
        "any.required":"Truong email bat buoc pbhai co",
        "string.email":"Email khong dung dinh dang"
    }),
    password:Joi.string().required().min(6).messages({
        "string.empty": "Pass khong duoc de trong",
        "any.required": "Truong Pass bat buoc pbhai co",
        "string.min": "Pass phai co {#limit} ky tu tro len"
    }),
    image: Joi.string().required().messages({
        "string.empty": "image khong duoc de trong",
        "any.required": "Truong image phai bat buoc co"
    }),
    confirmpassword: Joi.string().required().valid(Joi.ref("password")).messages({
        "string.empty": "Pass khong duoc de trong",
        "any.required": "Truong xac nhan mat khau  bat buoc pbhai co",
        "any.only": "Mat khau khong khop"
    })


})
export const validateSingin = Joi.object({
   
    email: Joi.string().email().required().messages({
        "string.empty": "Email khong duoc de trong",
        "any.required": "Truong email bat buoc pbhai co",
        "string.email": "Email khong dung dinh dang"
    }),
    password: Joi.string().required().min(6).messages({
        "string.empty": "Pass khong duoc de trong",
        "any.required": "Truong Pass bat buoc pbhai co",
        "string.min": "Pass phai co {#limit} ky tu tro len"
    })

})

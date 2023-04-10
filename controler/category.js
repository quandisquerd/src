import Category from "../../model/category";
import Joi from "joi"
import Product from "../../model/product";
// import multer from "multer";
import formidable from "formidable";
// const fs = require('fs');
const JoiValidate = Joi.object({
    name: Joi.string().required(),

})



export const AllCategory = async function (req, res) {


    try {
        const data = await Category.find()
        if (data.length === 0) {
            return res.status(200).json({ message: "No products found" })
        }
        return res.json(data)
    } catch (err) {
        return res.json({
            message: "kiem tra lai api", err
        })
    }

}
export const CreateCategory = async (req, res) => {
    const query = req.query
    console.log(query)
    try {
        const body = req.body;
        const { error } = JoiValidate.validate(body)
        if (error) {
            const errors = error.details.map((errItem) => errItem.message)
            return res.status(400).json({
                message: errors
            });
        }
        // const { data } = await axios.post("http://localhost:3000/products", body);
        const data = await Category.create(body)
        if (!data) {
            return res.status(400).json({ message: "Thêm danh muc thất bại" });
        }
        return res.json({
            message: "Thêm danh muc thành công",
            data
        });
    } catch (err) {
        return res.json({ message: "loi Api", err })
    }
};
export const OneCategory = async function (req, res) {
    try {
        // const id = req.params.id
        const category = await Category.findById(req.params.id).populate({ path: "products" });
        if (!category) {
            return res.status(200).json({ message: "khong co danh muc nao" })
        }
        return res.json(category)
    } catch (err) {
        return res.status(500).json({ message: "loi api" })
    }
}
export const DeleteCategory = async (req, res) => {
    const id = req.params.id
    // const { data } = await axios.delete("http://localhost:3000/products/" + req.params.id);
    const data = await Category.findOneAndDelete({_id:id})
    res.json({
        message: "XOA sản phẩm thành công",

    })
}
export const UpdateCategory = async (req, res) => {
    const id = req.params.id
    try {
        const body = req.body
        const { error } = JoiValidate.validate(body)
        if (error) {
            const errors = error.details.map((errItem) => errItem.message)
            return res.status(400).json({
                message: errors
            })
        }
        // const { data } = await axios.put("http://localhost:3000/products/" + req.params.id, body)
        const data = await Category.findOneAndUpdate({ _id: id }, body, { new: true })
        if (data.length === 0) {
            return res.status(200).json("rong")
        }
        return res.json(data)
    } catch (err) {
        return res.status(500).json({
            message: "loi api", err
        })
    }
}
// import axios from "axios";
import Product from "../../model/product";
import Category from "../../model/category"
import Joi from "joi"
import formidable from "formidable";

const JoiValidate = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string(),
    image:Joi.string(),
    categoryId: Joi.string().required(),
})

export const OneProduct = async function (req, res) {
    try {
        const id = req.params.id
        // const { data } = await axios.get('http://localhost:3000/products/' + id)
        const data = await Product.findById(id).populate({
            path: "categoryId",
            select: "-__v"
        })
        if (data.length === 0) {
            return res.status(200).json({ message: "rong" })
        }
        return res.json(data)
    } catch (err) {
        return res.status(500).json({ message: "loi api" })
    }


}
export const AllProduct = async function (req, res) {


    try {
        const { _sort = "createAt", _order = "asc", _limit = 100000, _page = 1 } = req.query
        const options = {
            page: _page,
            limit: _limit,
            sort: {
                [_sort]: _order == "desc" ? -1 : 1,
            }
        }
        const { docs, totalDocs, totalPages } = await Product.paginate({}, options)
        if (docs.length === 0) {
            return res.status(200).json({ message: "No products found" })
        }
        return res.json({ data: docs, totalDocs, totalPages })
    } catch (err) {
        return res.json({
            message: "kiem tra lai api", err
        })
    }

}
// app.post("/api/products" ,async function (req,res){
//     const body= req.body
//     console.log(body)
//     const {data}= await axios.post('http://localhost:3002/product',body)
//     res.json({
//         message: "Thêm sản phẩm thành công",
//         data
//     })
// })
// // Khởi tạo storage engine cho Multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// // Khởi tạo upload object với Multer
// const upload = multer({ storage: storage });
export const uploadfile = (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
            return;
        }
        const file = files.image;
        const oldPath = file.path;
        const newPath = './uploads/' + file.name;
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
                return;
            }
            res.send('File uploaded');
        });
    });
}

export const CreateProduct = async (req, res) => {
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
        const product = await Product.create(body)
        await Category.findByIdAndUpdate(product.categoryId, {
            $addToSet: {
                products: product._id
            }
        });
        if (!product) {
            return res.status(400).json({ message: "Thêm sản phẩm thất bại" });
        }
        return res.json({
            message: "Thêm sản phẩm thành công",
            product
        });
    } catch (err) {
        return res.json(err.message)
    }
};
export const DeleteProduct = async (req, res) => {
    const id = req.params.id
    console.log(id)
    // const { data } = await axios.delete("http://localhost:3000/products/" + req.params.id);
    const data = await Product.findOneAndDelete({_id:id})
    res.json({
        message: "XOA sản phẩm thành công",
        data

    })
}
export const UpdateProduct = async (req, res) => {
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
        const data = await Product.findOneAndUpdate({ _id: id }, body, { new: true })
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


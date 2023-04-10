import User from '../../model/user'
import Joi from "joi"
import formidable from "formidable";


export const OneUser = async function (req, res) {
    try {
        const id = req.params.id
        // const { data } = await axios.get('http://localhost:3000/products/' + id)
        const data = await User.findById(id)
        if (data.length === 0) {
            return res.status(200).json({ message: "rong" })
        }
        return res.json(data)
    } catch (err) {
        return res.status(500).json({ message: "loi api" })
    }


}
export const AllUser = async function (req, res) {


    try {
        // const { _sort = "createAt", _order = "asc", _limit = 100000, _page = 1 } = req.query
        // const options = {
        //     page: _page,
        //     limit: _limit,
        //     sort: {
        //         [_sort]: _order == "desc" ? -1 : 1,
        //     }
        // }
        const data = await User.find()
        if (data === 0) {
            return res.status(200).json({ message: "No products found" })
        }
        return res.json({
            message:"thanh cong",
            data
        })
    } catch (err) {
        return res.json({
            message: "kiem tra lai api", err
        })
    }

}
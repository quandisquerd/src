import jwt from 'jsonwebtoken'
import User from '../../model/user'
export const checkPermission = async (req, res, next) => {

    try {
        if (!req.headers.authorization) {
            return res.status(403).json({ message: "ban chua dang nhap" })
        }
        const token = req.headers.authorization.split(" ")[1]

        jwt.verify(token, "banquan", async (error, payload) => {
            if (error) {
                if (error.name == "TokenExpiredError") {
                    return res.status(400).json({ message: "Token het han" })
                }
                if (error.name == "JsonWebTokenError") {
                    return res.status(400).json({ message: "Token khong dung dinh dang" })
                }
            }
            const user = await User.findById(payload._id)
            console.log(user)

            if (user.role !== "admin") {
                return res.status(400).json({ message: "ban khong quyen cut" })
            }
            next()
        })


    } catch (err) {
        return res.status(400).json({ message: "loi api" })
    }
}
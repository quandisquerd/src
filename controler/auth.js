import User from "../../model/user"
import { validateSingup, validateSingin } from "../validate/validateAuth"
import bcryct from "bcryptjs"
import jwt from "jsonwebtoken"
export const singup = async (req, res) => {
  try {
    const userExit = await User.findOne({ email: req.body.email });
    if (userExit) {
      return res.status(400).json({
        message: "Email da ton tai"
      })
    }
    const { error } = validateSingup.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message)
      return res.status(400).json({
        message: errors
      })
    }
    const hashedPassword = await bcryct.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      image: req.body.image,
      password: hashedPassword,
    });

    const accessToken = jwt.sign({ _id: user._id }, "boquan", { expiresIn: "1d" });
    // const data = await User.create(req.body)
    return res.status(200).json({
      message: "Dang ky thanh cong",
      accessToken,
      user
    })
  } catch (err) {
    return res.status(404).json({ message: err })
  }
}


export const singin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = validateSingin.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(err => err.message)
      return res.status(400).json({
        message: errors
      });
    }
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.status(404).json({
        message: "email khong ton tai"
      })
    }
    const isMath = await bcryct.compare(password, user.password)
    if (!isMath) {
      return res.status(404).json({
        message: "Mat khau khong dung"
      })
    }
    const accessToken = jwt.sign({ _id: user._id }, "banquan", { expiresIn: "1d" })
    return res.status(200).json({
      message: "dang nhap thanh cong",
      accessToken,
      user
    })
  } catch (err) {
    return res.status(404).json({ message: "loi api" })
  }
}

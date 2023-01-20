import User from "../models/UserModel.js";
import bcrypt from 'bcrypt'

export const Login = async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })
    if (!user) return res.status(404).json({ msg: "Email does not exit" })
    const comparePassword = await bcrypt.compare(req.body.password, user.password)
    if (!comparePassword) return res.status(404).json({ msg: "Password is not correct" })
    req.session.userId = user.uid;
    const userId = user.userId;
    const id = user.id;
    const email = user.email;
    const fullName = user.fullName;
    const department = user.department;
    const role = user.role;
    const address = user.address;
    const phoneNo = user.phoneNo;
    res.status(200).json({ id, userId, fullName, email, department, role, address, phoneNo })
    console.log(res)
}
export const Me = async (req, res) => {
    if (!req.session.userId)
        return res.status(400).json({ msg: "Please login to your account" })
    const user = await User.findOne({
        attributes: ['id', 'fullName', 'email', 'phoneNo', 'address', 'role', 'department'],
        where: {
            uid: req.session.userId
        }
    })
    if (!user) return res.status(404).json({ msg: "User not Found Please try again" })
    res.status(200).json(user)
}

export const LogoutUser = async (req, res) => {
    req.session.destroy((err) => {
        if (!err) return res.status(400).json({ msg: "Can't log you out" })
        res.status(200).json({ msg: "Logout Successfully" })
    })
}
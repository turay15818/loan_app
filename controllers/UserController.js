import User from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import Loan from "../models/LoanRequestModel.js";
export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',],

            include: [{
                model: Loan,
                attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',]
            }]
        })
        res.status(200).json(response)
        console.log(response);
    } catch (error) {
        res.status(401).json({ msg: error.message })
        console.log(error)
    }
};
export const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role'],
            where: {
                uid: req.params.uid
            },

            include: [{
                model: Loan,
                attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',]
            }]
        })
        if (!response) return res.status(404).json({ msg: "User not found" })
        res.status(200).json(response)
        console.log(response)
    } catch (error) {
        res.status(401).json({ msg: error.message })
        console.log(error)
    }
}

export const createUser = async (req, res) => {
    const { fullName, staffId, department, email, phoneNo, address, role, password, confPassword } = req.body
    if (password !== confPassword) return res.status(400).json({ msg: "Sorry, but password does not match" });
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
        await User.create({
            fullName: fullName,
            email: email,
            phoneNo: phoneNo,
            role: role,
            password: hashedPassword,
            department: department,
            address: address,
            staffId: staffId
        });
        res.status(200).json({ msg: "User Added Successfully" })
        console.log(User)
    } catch (error) {
        res.status(401).json({ msg: error.message })
        console.log(error)
    }
};

export const updateUser = async (req, res) => {

    const user = await User.findOne({
        where: {
            uid: req.params.uid
        }
    });

    if (!user) return res.status(404).json({ msg: "Sorry but User does not exit" })
    console.log(user);
    let hashedPassword;
    const { password, confPassword, role, department } = req.body;
    if (password === '' || password === null) { hashedPassword = user.password }
    else { hashedPassword = bcrypt.hashSync(password, 10) }
    if (password !== confPassword) return res.status(400).json({ msg: "Sorry, but password does not match" });
    try {
        await User.update({
            password: hashedPassword,
            role: role,
            department: department,
        },
            {
                where: {
                    uid: req.params.uid
                }
            })
        res.status(200).json({ msg: "user Updated Successfully" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
        console.log(error)
    }
}

export const deleteUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            uid: req.params.uid
        }
    });
    if (!user) return res.status(404).json({ msg: "Sorry, But user does no exit" });
    try {
        await User.destroy({
            where: {
                uid: req.params.uid
            }
        });
        res.status(200).json({ msg: "User deleted Successfully" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
        console.log(error)
    }
}
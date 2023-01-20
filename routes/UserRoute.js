import express from "express";
import {
    getUsers,
    createUser,
    updateUser,
    getUserById,
    deleteUser
} from '../controllers/UserController.js'
import { verifyUser, adminOnly } from "../middleware/AuthorisedUser.js";
const router = express.Router();


router.get('/users', verifyUser, adminOnly, getUsers)
router.get('/users/:uid', verifyUser, adminOnly, getUserById)
router.post('/users', createUser)
router.patch('/users/:uid', adminOnly, updateUser)
router.delete('/users/:uid', verifyUser, adminOnly, deleteUser)

export default router
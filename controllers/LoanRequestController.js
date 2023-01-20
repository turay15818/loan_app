import User from "../models/UserModel.js";
import Loan from '../models/LoanRequestModel.js'
import path from "path"
import { Op } from "sequelize";
import moment from "moment";

export const getLoan = async (req, res) => {
    try {
        let response;
        if (req.role === "ceo") {
            response = await Loan.findAll({
                attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
                where: {
                    status: "Awaiting",
                    amount: {
                        [Op.gt]: 5000
                    },
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',]
                }]
            });
        };

        if (req.role === "director") {
            response = await Loan.findAll({
                attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
                where: {
                    status: "Awaiting",
                    amount: {
                        [Op.lte]: 5000
                    },
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',]
                }]
            });
        }

        if (req.role === "accountant") {
            response = await Loan.findAll({
                attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
                where: {
                    status: ["Approved", "Rejected"]
                },
                order: [
                    ['createdAt', 'DESC'],
                ],

                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',]
                }]
            });
        }

        else {
            if (req.role === "user") {
                response = await Loan.findAll({
                    attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
                    where: {
                        status: "Awaiting",
                        userId: req.userId,
                    },
                    order: [
                        ['createdAt', 'DESC'],
                    ],

                    include: [{
                        model: User,
                        attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',]
                    }]
                });
            }
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getLoanWithinOneDay = async (req, res) => {
    try {
        let response;
        if (req.role === "ceo") {
            response = await Loan.findAll({
                attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
                where: {
                    status: "Awaiting",
                    amount: {
                        [Op.gt]: 5000
                    },
                    createdAt: {
                        [Op.gte]: moment().subtract(1, 'days').toDate()
                    }
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',]
                }]
            });
        };

        if (req.role === "director") {
            response = await Loan.findAll({
                attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
                where: {
                    status: "Awaiting",
                    amount: {
                        [Op.lte]: 5000
                    },
                    createdAt: {
                        [Op.gte]: moment().subtract(1, 'days').toDate()
                    }
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',]
                }]
            });
        }

        if (req.role === "accountant") {
            response = await Loan.findAll({
                attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
                where: {
                    createdAt: {
                        [Op.gte]: moment().subtract(1, 'days').toDate()
                    },
                    status: ["Approved", "Rejected"]
                },
                order: [
                    ['createdAt', 'DESC'],
                ],

                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',]
                }]
            });
        }

        else {
            if (req.role === "user") {
                response = await Loan.findAll({
                    attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
                    where: {
                        status: "Awaiting",
                        userId: req.userId,
                        createdAt: {
                            [Op.gte]: moment().subtract(1, 'days').toDate()
                        }
                    },
                    order: [
                        ['createdAt', 'DESC'],
                    ],

                    include: [{
                        model: User,
                        attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',]
                    }]
                });
            }
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getLoanWithinSevenDays = async (req, res) => {
    try {
        let response;
        if (req.role === "ceo") {
            response = await Loan.findAll({
                attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
                where: {
                    status: "Awaiting",
                    amount: {
                        [Op.gt]: 5000
                    },
                    createdAt: {
                        [Op.gte]: moment().subtract(7, 'days').toDate()
                    }
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',]
                }]
            });
        };

        if (req.role === "director") {
            response = await Loan.findAll({
                attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
                where: {
                    status: "Awaiting",
                    amount: {
                        [Op.lte]: 5000
                    },
                    createdAt: {
                        [Op.gte]: moment().subtract(7, 'days').toDate()
                    }
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',]
                }]
            });
        }

        if (req.role === "accountant") {
            response = await Loan.findAll({
                attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
                where: {
                    createdAt: {
                        [Op.gte]: moment().subtract(7, 'days').toDate()
                    },
                    status: ["Approved", "Rejected"]
                },
                order: [
                    ['createdAt', 'DESC'],
                ],

                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',]
                }]
            });
        }

        else {
            if (req.role === "user") {
                response = await Loan.findAll({
                    attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
                    where: {
                        status: "Awaiting",
                        userId: req.userId,
                        createdAt: {
                            [Op.gte]: moment().subtract(7, 'days').toDate()
                        }
                    },
                    order: [
                        ['createdAt', 'DESC'],
                    ],

                    include: [{
                        model: User,
                        attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',]
                    }]
                });
            }
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getLoanWithinOneMonth = async (req, res) => {
    try {
        let response;
        if (req.role === "ceo") {
            response = await Loan.findAll({
                attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
                where: {
                    status: "Awaiting",
                    amount: {
                        [Op.gt]: 5000
                    },
                    createdAt: {
                        [Op.gte]: moment().subtract(30, 'days').toDate()
                    }
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',]
                }]
            });
        };

        if (req.role === "director") {
            response = await Loan.findAll({
                attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
                where: {
                    status: "Awaiting",
                    amount: {
                        [Op.lte]: 5000
                    },
                    createdAt: {
                        [Op.gte]: moment().subtract(30, 'days').toDate()
                    }
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',]
                }]
            });
        }

        if (req.role === "accountant") {
            response = await Loan.findAll({
                attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
                where: {
                    createdAt: {
                        [Op.gte]: moment().subtract(30, 'days').toDate()
                    },
                    status: ["Approved", "Rejected"]
                },
                order: [
                    ['createdAt', 'DESC'],
                ],

                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',]
                }]
            });
        }

        else {
            if (req.role === "user") {
                response = await Loan.findAll({
                    attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
                    where: {
                        status: "Awaiting",
                        userId: req.userId,
                        createdAt: {
                            [Op.gte]: moment().subtract(30, 'days').toDate()
                        }
                    },
                    order: [
                        ['createdAt', 'DESC'],
                    ],

                    include: [{
                        model: User,
                        attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',]
                    }]
                });
            }
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getApprovedLoan = async (req, res) => {
    try {
        let response;
        if (req.role === "ceo") {
            response = await Loan.findAll({
                attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
                where: {
                    status: "Approved",
                    amount: {
                        [Op.gt]: 5000
                    },
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',]
                }]
            });
        };

        if (req.role === "director") {
            response = await Loan.findAll({
                attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
                where: {
                    status: "Approved",
                    amount: {
                        [Op.lte]: 5000
                    },
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',]
                }]
            });
        }

        if (req.role === "accountant") {
            response = await Loan.findAll({
                attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
                where: {
                    status: ["Approved", "Rejected"]
                },
                order: [
                    ['createdAt', 'DESC'],
                ],

                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',]
                }]
            });
        }

        else {
            if (req.role === "user") {
                response = await Loan.findAll({
                    attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
                    where: {
                        userId: req.userId,
                        status: ["Approved"]
                    },
                    order: [
                        ['createdAt', 'DESC'],
                    ],

                    include: [{
                        model: User,
                        attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',]
                    }]
                });
            }
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getRejectedLoan = async (req, res) => {
    try {
        let response;
        if (req.role === "ceo") {
            response = await Loan.findAll({
                attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
                where: {
                    status: "Rejected",
                    amount: {
                        [Op.gt]: 5000
                    },
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',]
                }]
            });
        };

        if (req.role === "director") {
            response = await Loan.findAll({
                attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
                where: {
                    status: ["Approved", "Rejected"]
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',]
                }]
            });
        }

        if (req.role === "accountant") {
            response = await Loan.findAll({
                attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
                where: {
                    status: ["Approved", "Rejected"]
                },
                order: [
                    ['createdAt', 'DESC'],
                ],

                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',]
                }]
            });
        }

        else {
            if (req.role === "user") {
                response = await Loan.findAll({
                    attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
                    where: {
                        userId: req.userId,
                        status: ["Rejected"]
                    },
                    order: [
                        ['createdAt', 'DESC'],
                    ],

                    include: [{
                        model: User,
                        attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role',]
                    }]
                });
            }
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getLoanById = async (req, res) => {
    try {
        const response = await Loan.findOne({
            attributes: ['uid', 'id', 'name', 'requestingFor', 'amount', 'amountInWords', 'date', 'status', 'url', 'userId',],
            where: {
                uid: req.params.uid
            },

            include: [{
                model: User,
                attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role']
            }]
        })
        if (!response) return res.status(404).json({ msg: "Request not Found" })
        res.status(200).json(response)
        console.log(response)
    } catch (error) {
        res.status(401).json({ msg: error.message })
        console.log(error)
    }
}

export const requestForLoan = (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    const requestingFor = req.body.requestingFor;
    const amount = req.body.amount;
    const amountInWords = req.body.amountInWords;
    const date = req.body.date;
    const status = req.body.status;
    const name = req.body.name;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg', 'gif'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 20000000) return res.status(422).json({ msg: "Image must be less than 20 MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Loan.create({
                requestingFor: requestingFor,
                amount: amount,
                amountInWords: amountInWords,
                date: date,
                status: status,
                name: name,
                image: fileName,
                url: url,

                userId: req.userId
            });
            res.status(201).json({ msg: "Loan Request Send Successfully" });
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updateLoan = async (req, res) => {
    try {
        const loan = await Loan.findOne({
            where: {
                uid: req.params.uid
            }
        });

        if (!loan) return res.status(404).json({ msg: "Data not found" });
        const { status, url } = req.body;
        if (req.role === "ceo", "director") {
            await Loan.update({

                status, status,
                url, url,
            }, {
                where: {
                    uid: loan.uid
                }
            });
        }
        else {
            if (req.userId !== loan.userId) return res.status(403).json({ msg: "Access forbidden" });
            await Loan.update({

                status, status
            }, {
                where: {
                    [Op.and]: [{ uid: loan.uid }]
                }
            });
        }
        res.status(200).json({ msg: "Request Successfully updated" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


































export const deleteLoan = async (req, res) => {
    const user = await Loan.findOne({
        where: {
            uid: req.params.uid
        }
    });
    if (!user) return res.status(404).json({ msg: "Sorry, But the in does no exit" });
    try {
        await Loan.destroy({
            where: {
                uid: req.params.uid
            }
        });
        res.status(200).json({ msg: "Request deleted Successfully" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
        console.log(error)
    }
}
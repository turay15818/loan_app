import { getLoan, getLoanById, requestForLoan, getLoanWithinOneDay, getLoanWithinSevenDays, getLoanWithinOneMonth, getApprovedLoan, getRejectedLoan, updateLoan, deleteLoan } from '../controllers/LoanRequestController.js'
import { verifyUser, adminOnly } from '../middleware/AuthorisedUser.js'
import express from 'express'

const router = express.Router()

router.get('/loanWithinOneMonth', verifyUser, getLoanWithinOneMonth)
router.get('/loanWithinSevenDays', verifyUser, getLoanWithinSevenDays)
router.get('/loanWithinOneDay', verifyUser, getLoanWithinOneDay)
router.get('/rejectedLoan', verifyUser, getRejectedLoan)
router.get('/approvedLoan', verifyUser, getApprovedLoan)
router.get('/loan', verifyUser, getLoan)
router.post('/loan', verifyUser, requestForLoan)
router.get('/loan/:uid', verifyUser, getLoanById)
router.patch('/loan/:uid', updateLoan)
router.delete('/loan/:uid', verifyUser, deleteLoan)

export default router
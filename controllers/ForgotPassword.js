import express from 'express';
const router = express.Router();
import crypto from 'crypto';
const { User } = require('../models/UserModel.js');
import nodemailer  from 'nodemailer';

router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();
        // send email with the token
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'your@email.com',
              pass: 'yourpassword'
            }
          });
          
          const mailOptions = {
            from: 'your@email.com',
            to: user.email,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                  Please click on the following link, or paste this into your browser to complete the process:\n\n
                  http://localhost:3000/reset/${token}\n\n
                  If you did not request this, please ignore this email and your password will remain unchanged.\n`
          };
          transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
              console.error('there was an error: ', err);
            } else {
              console.log('here is the res: ', response);
              res.status(200).json({message: 'recovery email sent'});
            }
          });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;

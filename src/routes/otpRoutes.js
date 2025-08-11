const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const { TWILIO_SID, TWILIO_AUTH, TWILIO_PHONE, TWILIO_SERVICE, JWT_SECRET } = require('../config/allEnv');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const accountSid = TWILIO_SID;
const authToken = TWILIO_AUTH;
const twilioClient = twilio(accountSid, authToken);

router.post('/send', async (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: 'Phone number required' });

    try {
        const number = "+91" + phone;
        console.log({accountSid, authToken, TWILIO_SERVICE, number});
        const verification = await twilioClient.verify.v2.services(TWILIO_SERVICE)
            .verifications
            .create({ to: number, channel: 'sms' });

        res.json({ success: true });
    } catch (err) {
        console.log({ err })
        res.status(500).json({ error: err.message });
    }
});

router.post('/verify', async (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ message: 'Phone number and otp required' });
  }

  try {
    const number = phone.startsWith('+') ? phone : "+91" + phone;

    const verification_check = await twilioClient.verify.v2.services(TWILIO_SERVICE)
      .verificationChecks
      .create({ to: number, code: otp });

    if (verification_check?.status === 'approved') {
      // OTP verified — find or create user
      let user = await User.findOne({ where: { phone: number } });
      if (!user) {
        user = await User.create({ phone: number });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, phone: user.phone },
        JWT_SECRET,
        { expiresIn: '10d' }
      );

      return res.json({ success: true, token, user });
    } else {
      return res.status(400).json({ success: false, message: 'OTP verification failed or pending' });
    }
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message });
  }
});


module.exports = router;

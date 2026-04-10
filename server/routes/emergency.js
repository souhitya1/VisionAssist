const express = require('express'); // 1. Import express
const router = express.Router();

router.post('/sos', async (req, res) => {
    const { location, userId } = req.body;

    // 1. Send SMS to Family via Twilio
    // 2. Broadcast to Family Dashboard via Socket.io
    io.emit('emergency_alert', {
        user: userId,
        location: location,
        time: new Date().toLocaleTimeString()
    });

    console.log(`EMERGENCY: SOS received from ${userId} at ${location}`);
    res.status(200).json({ status: "Help is on the way" });
});
module.exports = router;
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
const aiRoutes = require('./routes/api');
const emergencyRoutes = require('./routes/emergency');
// 1. Import your Routes
const navRoutes = require('./routes/api'); // Make sure this path is correct

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" } // Allows connections from mobile/web
});

// 2. Middleware
app.use(express.json());

// 3. Use your Routes
app.use('/api/api', aiRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api', navRoutes); // All nav routes will now start with /api/navigate

// 4. Real-time Communication (Socket.io)
io.on('connection', (socket) => {
    console.log('Smart Device Connected:', socket.id);

    // Listen for pothole detection from the Python script/Glasses
    socket.on('obstacle_detected', (data) => {
        console.log('Obstacle Alert:', data);
        // Broadcast to the user's earpiece
        socket.emit('voice_alert', { message: `Watch out! ${data.label} nearby.` });
    });

    socket.on('disconnect', () => {
        console.log('Device Disconnected');
    });
});

// 5. Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`
    🚀 VisionAssist AI Server Running
    ---------------------------------
    Port: ${PORT}
    Status: Online
    Features: Assistant, Detection, SOS, Navigation
    `);
});
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #2ecc71;">✅ VisionAssist AI Backend: ONLINE</h1>
            <p>System Status: Active | All Modules Loaded</p>
            <hr style="width: 50%; margin: 20px auto;">
            <p style="color: #7f8c8d;">Device Connection: Waiting for Pairing...</p>
        </div>
    `);
});
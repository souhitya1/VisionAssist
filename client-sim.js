// client-sim.js
const { io } = require("socket.io-client");

// Replace with your IP if testing on a phone, otherwise use localhost
const socket = io("http://localhost:5000");

socket.on("connect", () => {
    console.log("✅ Device Paired Successfully! ID:", socket.id);
    
    // Simulate sending a "Pothole" detection
    console.log("📡 Scanning environment...");
    setTimeout(() => {
        socket.emit("obstacle_detected", { label: "Pothole", distance: "1.5m" });
    }, 3000);
});

socket.on("voice_alert", (data) => {
    console.log("🔊 AUDIO OUTPUT:", data.message);
});
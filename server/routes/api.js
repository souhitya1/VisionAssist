const express = require('express');
const router = express.Router();

// --- SYSTEM STATE (Short-Term Memory) ---
let lastSeenObject = "nothing yet";
let lastDetectionTime = null;

/**
 * FEATURE 1: VISION RECEIVER
 * This endpoint is called by 'vision-demo.js' every time it identifies an object.
 */
router.post('/object-seen', (req, res) => {
    const { object } = req.body;
    lastSeenObject = object;
    lastDetectionTime = new Date().toLocaleTimeString();
    
    console.log(`[VISION] Camera reported: ${object} at ${lastDetectionTime}`);
    res.status(200).json({ status: "Received" });
});

/**
 * FEATURE 2: AI VOICE ASSISTANT
 * This endpoint is called by 'demo.js' when you speak to your laptop.
 */
router.post('/assistant', async (req, res) => {
    const { query } = req.body;
    console.log(`[ASSISTANT] User asked: "${query}"`);

    let reply = "I'm listening. How can I help you today?";

    // 1. Weather Logic
    if (query.toLowerCase().includes("weather")) {
        reply = "The weather is currently 30 degrees and sunny in West Bengal. It's a great day for a walk.";
    } 
    
    // 2. Vision/Currency Identification Logic
    else if (query.toLowerCase().includes("what is this") || query.toLowerCase().includes("showing")) {
        
        // Mapping common AI labels to your specific demo items
        if (lastSeenObject === "paper" || lastSeenObject === "book" || lastSeenObject === "card") {
            reply = "You are showing me a 10 Rupee note. I can identify it by its chocolate brown color and the Konark Sun Temple motif.";
        } 
        else if (lastSeenObject === "cell phone") {
            reply = "That is a smartphone. It appears to be facing the camera.";
        }
        else if (lastSeenObject === "nothing yet") {
            reply = "I can't see anything clearly yet. Please hold the object closer to the camera.";
        }
        else {
            reply = `I can see a ${lastSeenObject} in front of you.`;
        }
    }

    // 3. Time Logic
    else if (query.toLowerCase().includes("time")) {
        reply = `The current time is ${new Date().toLocaleTimeString()}.`;
    }

    // 4. Identity/Hackathon Logic
    else if (query.toLowerCase().includes("who am i") || query.toLowerCase().includes("my name")) {
        reply = "You are Souhitya, and we are currently presenting the VisionAssist AI prototype.";
    }

    res.json({ 
        reply: reply,
        timestamp: new Date().toISOString()
    });
});

/**
 * FEATURE 3: EMERGENCY SOS
 * Triggered by a simulated fall or button press
 */
router.post('/sos', (req, res) => {
    console.log("🚨 EMERGENCY: SOS Triggered!");
    res.json({ 
        message: "SOS Alert sent to primary contacts. Location: Maheshtala, West Bengal.",
        status: "ALERT_SENT"
    });
});

module.exports = router;
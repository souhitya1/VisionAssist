const say = require('say');
const axios = require('axios');

async function askAssistant(question) {
    console.log(`👤 Speaking: "${question}"`);
    
    try {
        // This sends the question to your running Node.js server
        const response = await axios.post('http://localhost:5000/api/assistant', {
            query: question
        });

        const reply = response.data.reply;
        console.log(`🤖 AI: ${reply}`);

        // This makes your laptop actually speak!
        say.speak(reply);

    } catch (error) {
        console.error("❌ Could not connect to the server. Make sure 'node server/app.js' is running!");
    }
}

// --- DEMO SEQUENCE ---
console.log("--- VisionAssist AI Voice Demo ---");

// Test 1: Asking the time
setTimeout(() => {
    askAssistant("What is the time right now?");
}, 1000);

// Test 2: Asking identity (after 5 seconds)
setTimeout(() => {
    askAssistant("Who am I?");
}, 6000);
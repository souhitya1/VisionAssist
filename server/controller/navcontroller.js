// server/controllers/navController.js

const getNavigationCues = (routeData) => {
    // This logic extracts the next instruction for the bone conduction speaker
    try {
        const nextStep = routeData.steps[0];
        const instruction = nextStep.instruction; // e.g., "Turn left"
        const distance = nextStep.distance.text;  // e.g., "50 meters"
        
        return `${instruction} in ${distance}`;
    } catch (error) {
        return "Continue straight.";
    }
};

// This function will be called when the glasses request the next direction
exports.getNextInstruction = (req, res) => {
    const { routeData } = req.body;
    const voiceCue = getNavigationCues(routeData);
    
    res.json({
        cue: voiceCue,
        type: "NAV_INSTRUCTION"
    });
};
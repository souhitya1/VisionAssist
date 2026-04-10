const NodeWebcam = require("node-webcam");
const tf = require('@tensorflow/tfjs');
const cocoSsd = require('@tensorflow-models/coco-ssd');
const axios = require('axios');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

const Webcam = NodeWebcam.create({
    width: 640, height: 480, quality: 100,
    delay: 0, saveShots: true, output: "jpeg",
    device: false, callbackReturn: "buffer", verbose: false
});

async function runVision() {
    console.log("⏳ Loading AI Model... Please wait.");
    const model = await cocoSsd.load();
    console.log("👁️ Vision System Online!");

    setInterval(() => {
        Webcam.capture("shot", async (err, data) => {
            if (err) return;

            const img = await loadImage(data);
            const canvas = createCanvas(img.width, img.height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            const predictions = await model.detect(canvas);

            if (predictions.length > 0) {
                const item = predictions[0].class;
                console.log(`📸 I see: ${item}`);
                
                await axios.post('http://localhost:5000/api/object-seen', { object: item })
                    .catch(() => {}); 
            }
        });
    }, 3000); // Scans every 3 seconds
}

runVision();
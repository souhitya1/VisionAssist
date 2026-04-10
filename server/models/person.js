const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    name: String,
    relationship: String,
    faceEmbedding: Array, // Mathematical representation of their face
    addedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Person', PersonSchema);
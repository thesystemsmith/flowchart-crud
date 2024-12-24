const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
    id: String,
    label: String,
});

const EdgeSchema = new mongoose.Schema({
    from: String,
    to: String,
});

const FlowchartSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    nodes: [NodeSchema],
    edges: [EdgeSchema],
});

module.exports = mongoose.model('Flowchart', FlowchartSchema);

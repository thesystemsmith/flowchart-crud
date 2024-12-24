const Flowchart = require('../models/flowchart');
const { validateGraph, findConnectedNodes } = require('../utils/graphUtils');

//create
exports.createFlowchart = async (req, res) => {
    try {
        const { id, nodes, edges } = req.body;

        if (!validateGraph(nodes, edges)) {
            return res.status(400).json({
                error: 'Invalid graph structure'
            });
        }

        const flowchart = new Flowchart({ id, nodes, edges });
        await flowchart.save(); // persist in db

        res.status(201).json(flowchart);
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};

//find one
exports.fetchFlowchart = async (req, res) => {
    try {
        const flowchart = await Flowchart.findOne({ id: req.params.id });
        if (!flowchart) {
            return res.status(404).json({
                error: 'Flowchart not found'
            });
        }

        res.json(flowchart);
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};

//update
exports.updateFlowchart = async (req, res) => {
    try {
        const { nodes, edges } = req.body;
        if (!validateGraph(nodes, edges)) {
            return res.status(400).json({ 
                error: 'Invalid graph structure' 
            });
        }

        const flowchart = await Flowchart.findOneAndUpdate(
            { id: req.params.id },
            { $set: { nodes, edges } }, //tokens in mongo
            { new: true }
        );

        if (!flowchart){
            return res.status(404).json({ 
                error: 'Flowchart not found' 
            });
        } 

        res.json(flowchart); // updated
    } catch (err) {
        res.status(400).json({ 
            error: err.message 
        });
    }
};

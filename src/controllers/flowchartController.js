const Flowchart = require('../models/flowchart');
const { validateGraph, findConnectedNodes } = require('../utils/graphUtils');

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

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

        if (!flowchart) {
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

//delete
exports.deleteFlowchart = async (req, res) => {
    try {
        const flowchart = await Flowchart.findOneAndDelete({
            id: req.params.id
        });

        if (!flowchart) {
            return res.status(404).json({
                error: 'Flowchart not found'
            });
        }

        res.json({
            message: 'Flowchart deleted'
        });

    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};

//get edges
exports.getOutgoingEdges = async (req, res) => {
    try {
        const flowchart = await Flowchart.findOne({
            id: req.params.id
        });

        if (!flowchart) {
            return res.status(404).json({
                error: 'Flowchart not found'
            });
        }

        const outgoingEdges = flowchart.edges.filter(edge =>
            edge.from === req.params.nodeId
        );

        //error
        if(outgoingEdges.length == 0){
            return res.status(404).json({
                error: 'No outgoing edges found for the specified node'
            });
        }

        res.json(outgoingEdges);
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};

//get nodes based on
exports.getConnectedNodes = async (req, res) => {
    try {
        const flowchart = await Flowchart.findOne({
            id: req.params.id
        });

        if (!flowchart) {
            return res.status(404).json({
                error: 'Flowchart not found'
            });
        }

        const connectedNodes = findConnectedNodes(flowchart, req.params.nodeId);
        res.json(connectedNodes);
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};

//validate api
exports.validateFlowchart = async (req, res) => {
    const { id } = req.params;

    try {
        // Retrieve the flowchart by ID from the database
        const flowchart = await Flowchart.findOne({ id });

        if (!flowchart) {
            return res.status(404).json({ error: 'Flowchart not found' });
        }

        // Call the validateGraoh function from the utility to check if the flowchart is valid
        const isValid = validateGraph(flowchart.nodes, flowchart.edges);

        if (isValid) {
            return res.json({ message: 'Flowchart is valid' });
        } else {
            return res.status(400).json({ error: 'Flowchart is invalid' });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

}
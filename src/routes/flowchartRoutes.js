const express = require('express');
const {
    createFlowchart,
    fetchFlowchart,
    updateFlowchart,
    deleteFlowchart,
    getOutgoingEdges,
    getConnectedNodes,
    validateFlowchart
} = require('../controllers/flowchartController')
const router = express.Router()

//define routes
router.post('/flowcharts', createFlowchart)
router.get('/flowcharts/:id', fetchFlowchart)
router.put('/flowcharts/:id', updateFlowchart)
router.delete('/flowcharts/:id', deleteFlowchart)
router.get('/flowcharts/:id/outgoing/:nodeId', getOutgoingEdges)
router.get('/flowcharts/:id/connected/:nodeId', getConnectedNodes)
router.get('/flowcharts/:id/validate', validateFlowchart)

//swagger documentation
//http://localhost:3000/docs/ - access swagger docs from this url after starting the application on local machine
/**
 * @swagger
 * /flowcharts:
 *   post:
 *     summary: Create a new flowchart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               nodes:
 *                 type: array
 *                 items:
 *                   type: string
 *               edges:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     from:
 *                       type: string
 *                     to:
 *                       type: string
 *     responses:
 *       201:
 *         description: Flowchart created successfully
 */
router.post('/flowcharts', (req, res) => {
    res.status(201).json({ message: 'Flowchart created', flowchart: req.body });
});

/**
 * @swagger
 * /flowcharts/{id}:
 *   get:
 *     summary: Fetch a flowchart by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flowchart ID
 *     responses:
 *       200:
 *         description: Flowchart details
 *       404:
 *         description: Flowchart not found
 */
router.get('/flowcharts/:id', (req, res) => {
    res.status(200).json({ message: `Fetching flowchart with ID: ${req.params.id}` });
});

/**
 * @swagger
 * /flowcharts/{id}:
 *   put:
 *     summary: Update a flowchart by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flowchart ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nodes:
 *                 type: array
 *                 items:
 *                   type: string
 *               edges:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     from:
 *                       type: string
 *                     to:
 *                       type: string
 *     responses:
 *       200:
 *         description: Flowchart updated successfully
 *       404:
 *         description: Flowchart not found
 */
router.put('/flowcharts/:id', (req, res) => {
    res.status(200).json({ message: `Updated flowchart with ID: ${req.params.id}`, data: req.body });
});

/**
 * @swagger
 * /flowcharts/{id}:
 *   delete:
 *     summary: Delete a flowchart by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flowchart ID
 *     responses:
 *       200:
 *         description: Flowchart deleted successfully
 *       404:
 *         description: Flowchart not found
 */
router.delete('/flowcharts/:id', (req, res) => {
    res.status(200).json({ message: `Deleted flowchart with ID: ${req.params.id}` });
});

/**
 * @swagger
 * /flowcharts/{id}/validate:
 *   get:
 *     summary: Validate the structure of a flowchart
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flowchart ID
 *     responses:
 *       200:
 *         description: Validation result
 */
router.get('/flowcharts/:id/validate', (req, res) => {
    res.status(200).json({ message: `Validating flowchart with ID: ${req.params.id}` });
});

/**
 * @swagger
 * /flowcharts/{id}/edges/{nodeId}:
 *   get:
 *     summary: Fetch all outgoing edges for a given node
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flowchart ID
 *       - in: path
 *         name: nodeId
 *         required: true
 *         schema:
 *           type: string
 *         description: Node ID
 *     responses:
 *       200:
 *         description: Outgoing edges fetched successfully
 */
router.get('/flowcharts/:id/edges/:nodeId', (req, res) => {
    res.status(200).json({ message: `Fetching outgoing edges for node ${req.params.nodeId} in flowchart ${req.params.id}` });
});

/**
 * @swagger
 * /flowcharts/{id}/connected-nodes/{nodeId}:
 *   get:
 *     summary: Fetch all nodes connected to a specific node
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flowchart ID
 *       - in: path
 *         name: nodeId
 *         required: true
 *         schema:
 *           type: string
 *         description: Node ID
 *     responses:
 *       200:
 *         description: Connected nodes fetched successfully
 */
router.get('/flowcharts/:id/connected-nodes/:nodeId', (req, res) => {
    res.status(200).json({ message: `Fetching nodes connected to ${req.params.nodeId} in flowchart ${req.params.id}` });
});

module.exports = router;
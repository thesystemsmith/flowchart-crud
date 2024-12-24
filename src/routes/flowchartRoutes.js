const express = require('express');
const {
    createFlowchart,
    fetchFlowchart,
    updateFlowchart,
    deleteFlowchart,
    getOutgoingEdges,
} = require('../controllers/flowchartController')
const router = express.Router()

//define routes
router.post('/flowcharts', createFlowchart)
router.get('/flowcharts/:id', fetchFlowchart)
router.put('flowcharts/:id', updateFlowchart)
router.delete('/flowcharts:/id', deleteFlowchart)
router.get('/flowcharts/:id/outgoing/:nodeId', getOutgoingEdges)

module.exports = router
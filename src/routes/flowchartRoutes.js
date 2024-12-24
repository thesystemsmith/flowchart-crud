const express = require('express');
const {
    createFlowchart,
    fetchFlowchart,
    updateFlowchart
} = require('../controllers/flowchartController')
const router = express.Router()

//define routes
router.post('/flowcharts', createFlowchart)
router.get('/flowcharts/:id', fetchFlowchart)
router.put('flowcharts/:id', updateFlowchart)

module.exports = router
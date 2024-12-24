const express = require('express');
const {
    createFlowchart,
    fetchFlowchart,
} = require('../controllers/flowchartController')
const router = express.Router()

//define routes
router.post('/flowcharts', createFlowchart)
router.get('/flowchart/:id', fetchFlowchart)

module.exports = router
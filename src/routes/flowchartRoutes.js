const express = require('express');
const {createFlowchart} = require('../controllers/flowchartController')
const router = express.Router()

//define routes
router.post('/flowcharts', createFlowchart)

module.exports = router
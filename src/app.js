const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flowchartRoutes = require('./routes/flowchartRoutes');
const swaggerDoc = require('./swagger');

const app = express();

app.use(bodyParser.json()); // parse JSON request bodies
app.use('/api', flowchartRoutes); // add routes to /api endpoint
swaggerDoc(app); // Initialize Swagger docs

mongoose.connect('mongodb://localhost:27017/flowchartdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(3000, () => console.log('Server running on port 3000')))
    .catch(err => console.error('Database connection error:', err));

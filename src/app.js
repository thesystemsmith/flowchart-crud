const express = require('express');
const bodyParser = require('body-parser');
const flowchartRoutes = require('./routes/flowchartRoutes');
const swaggerDoc = require('./swagger');
const connectDB = require('./config/db')

const app = express();
//connect to database
connectDB()

app.use(bodyParser.json()); // parse JSON request bodies
app.use('/api', flowchartRoutes); // add routes to /api endpoint
swaggerDoc(app); // Initialize Swagger docs

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
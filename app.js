const express = require('express');
const app = express();
const cors = require('cors');

const apiRoutes = require('./routes/api.routes');

app.use(express.static('uploads'));

app.use(cors());

app.use(express.json());

app.use('/api', apiRoutes);

module.exports = app;
const express = require('express');
const cookieParser = require('cookie-parser');  // Fixed package name & require
const authRoutes = require('../routes/auth.route');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);


// Add your routes here

module.exports = app;

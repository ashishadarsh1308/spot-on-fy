const express = require('express');
const cookieParser = require('cookie-parser');  // Fixed package name & require
const authRoutes = require('../routes/auth.route');
const musicRoutes = require('../routes/music.route');

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/music', musicRoutes);


// Add your routes here

module.exports = app;

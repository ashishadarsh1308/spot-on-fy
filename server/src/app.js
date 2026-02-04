const express = require('express');
const cookieParser = require('cookie-parser');  // Fixed package name & require

const app = express();

app.use(express.json());
app.use(cookieParser());

// Add your routes here

module.exports = app;

const express = require('express');
const cookieParser = require('cookie-parser');  // Fixed package name & require
const Router = express.Router();
const musicController = require('../controllers/music.controller');
const multer = require('multer');

const upload = require('multer')({ storage: multer.memoryStorage() });

// Router.post('/upload', upload.single('song'), musicController.addSong);
Router.post('/upload', upload.single('song'), musicController.addSong);


module.exports = Router;

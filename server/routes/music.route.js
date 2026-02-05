const express = require('express');
const cookieParser = require('cookie-parser');  // Fixed package name & require
const Router = express.Router();
const musicController = require('../controllers/music.controller');

Router.get('/songs', musicController.getAllSongs);
Router.post('/songs', musicController.addSong);

module.exports = Router;

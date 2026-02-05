const musicModel = require('../models/music.model');
const jwt = require('jsonwebtoken')
const { uploadFile } = require('../services/storage.service')

async function addSong(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized User"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== 'artist') {
            return res.status(403).json({
                message: "You are not Authorized to create song"
            })
        }

        const { title } = req.body;
        const file = req.file;       // multer file

        if (!file) {
            return res.status(400).json({
                message: "No file uploaded. Use 'image' key in form-data."
            });
        }

        const fileUrl = await uploadFile(file);

        const newSong = new musicModel({
            uri: fileUrl,
            title,
            artist: decoded.id
        });

        const savedSong = await newSong.save();

        return res.status(201).json({
            message: "Song added successfully",
            song: savedSong
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}
async function getAllSongs(req, res) { }

module.exports = {
    getAllSongs,
    addSong
};
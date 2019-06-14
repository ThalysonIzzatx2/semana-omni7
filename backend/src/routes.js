const express = require('express');
const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');
const multer = require('multer');

const upload = multer(uploadConfig);
const routes = new express.Router();

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);
routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;
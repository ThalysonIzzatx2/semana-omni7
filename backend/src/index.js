const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
if (process.env.NODE_ENV !== 'production') require('custom-env').env();

const port = process.env.PORT || 3333;
const mongooUrl = process.env.MONGOO_URL;
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use((req, res, next) => {
    req.io = io;

    next();
});
mongoose.connect(mongooUrl, { useNewUrlParser: true });
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
app.use(cors());
app.use(require('./routes'));

server.listen(port);
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});

mongoose.connect("mongodb+srv://iurigarbim:iurigarbim@cluster0-9bus3.mongodb.net/omnistack?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;

    return next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Usado para permitir upload de arquivos
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));

app.use(require('./routes')); // Ele está recebendo a variável routes através do module.exports usado no routes.js

server.listen(process.env.PORT || 3333);
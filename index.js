const mongoose = require('mongoose')
const express = require('express')
const socketIo = require('socket.io');
const http = require('http');
const { connectDB } = require("./db.js");
const User = require('./models/model.js');
const { insert, deleteAll } = require('./models/controller.js');
const router = require('./router.js');


const app = express();
app.use(router);
connectDB();
//insert one reacord into collection
deleteAll();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*"
    }
});

io.on('connection', (socket) => {
    console.log('A new user Connected');
    const changeStream = User.watch();
    //can only operate in Replica Set
    //mongod --replSet rs0 --port 27017
    changeStream.on('change', (data) => {
        console.log('DOCUMENT CHANGED'+data);
    })
})

server.listen(5000, () => {
    console.log("Connected to Server 5000..");
})
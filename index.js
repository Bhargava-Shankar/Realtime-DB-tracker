const mongoose = require('mongoose')
const express = require('express')
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors')
const bodyParser = require('body-parser');
const { connectDB } = require("./db.js");
const User = require('./models/model.js');
const { insert, deleteAll } = require('./models/controller.js');
const router = require('./router.js');


const app = express();
app.use(bodyParser.json());
app.use(router);
connectDB();
//insert one record into collection
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
        console.log(data);
        //Delete/Update Takes Place in Document
        socket.emit("msg", data);
        // socket.emit("msg", "MESSAGE FROM SERVER");
    })
})

app.listen(5000, () => {
    console.log("Node Server Started at 5000...");
})


server.listen(3000, () => {
    console.log("Socket Server Started at 3000..");
})
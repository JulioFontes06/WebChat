import express from 'express'
import { createServer } from 'http'
import { Server } from "socket.io";


const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {})

let serverData = []

app.use(express.static('../public'))

io.on('connection', (client) => {
    console.log('client connected')
    client.emit("welcome", serverData)
    io.emit('currentStatus', serverData)

    client.on('message', (message) => {
        serverData.push(message)
        io.emit('returnMessage', message)
        io.emit('serverState', serverData)
    })


})

httpServer.listen(3000, () => console.log('server Started'))
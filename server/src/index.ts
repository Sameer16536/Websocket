import express from 'express'
import { WebSocketServer,WebSocket } from 'ws'

const app = express()
const httpServer = app.listen(3000)

const wss = new WebSocketServer({server:httpServer})

wss.on('connection',(socket)=>{
   socket.on('error',console.error)
   socket.on('message',(data,isBinary)=>{
        wss.clients.forEach(function each(client){
            if(client.readyState ===WebSocket.OPEN ){
                client.send(data,{binary : isBinary})
            }
        })
   })
   socket.send("Hello from server")
})
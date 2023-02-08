const express=require("express");

require("dotenv").config();

const app=express();

const http=require("http");

const cors=require("cors");

const port=process.env.PORT || 8090;

app.use(cors());

const {Server}=require("socket.io");

const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    }
});

//

// io.on means listening

io.on("connection",(socket)=>{
    // console.log("User id:",socket.id);

    socket.on("join-room",(data)=>{
        console.log("clicked join room button")
        socket.join(data.roomId)
    })

    socket.on("send-messages",(data)=>{
        socket.to(data.roomId).emit("receive-messages",data)
    })

    socket.on("disconnect",()=>{
        console.log("User disconnected with id:",socket.id)
    })

})

server.listen(port,()=>{
    console.log("Server listening at:",port)
})
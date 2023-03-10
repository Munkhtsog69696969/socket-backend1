const express=require("express");

require("dotenv").config();

const app=express();

const http=require("http");

const cors=require("cors");

const port=1234;

app.use(cors());

const {Server}=require("socket.io");

const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    }
});


io.on("connection",(socket)=>{
    // console.log(socket.id)

    socket.on("join_room",(data)=>{
        console.log(data)

        socket.join(data.room)
    })

    socket.on("send_messages",(data)=>{
        console.log(data)

        socket.to(data.room).emit("received_messages",{message:data.message , name:data.name , imageUrl:data.imageUrl});
    })

    socket.on("disconnect",()=>{
        console.log("User disconnected with id:",socket.id)
    })
})

server.listen(port,()=>{
    console.log("Server listening at:",port)
})
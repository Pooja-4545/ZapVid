import express from "express";

import { createServer, METHODS } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";

const app = express();
const server = createServer(app);
const io = connectToSocket(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
        Credentials: true
    }
});

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));

app.get("/home", (req, res)=>{
    return res.json({"hello": "world"})
});

const start = async () => {
    const connectionDB = await mongoose.connect("mongodb+srv://poojaj4545:HH3Ave1NSX3RkDte@cluster0.ewt1n.mongodb.net/")  
    console.log(`MONGO CONNECTED DB HOST: ${connectionDB.connection.host}`)
    server.listen(app.get("port"), () =>{
        console.log("Listen port")
    });
}

start();
const cors = require("cors");
const mongoose=require("mongoose");
const express = require("express");
const morgan = require('morgan');
const AdminRoute=require("./Routes/AdminRoute");
const loginRoute=require("./Routes/login");
const AuthenticateMW=require("./Core/auth/AuthenticateMW");


//Server
const server = express();
let port = process.env.port||8080;
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/Library")
        .then(()=>{
            console.log("DB is connected");
            server.listen(port,()=>{
                console.log("Server is listenng..",port);
            });
        })
        .catch(error=>{
            console.log("Db Problem "+error);
        })
//////////////////

server.use(cors());

//First Middleware
server.use(morgan('combined'))
server.use(express.json());
server.use(express.urlencoded({extended:false}));
//Routes  
server.use(loginRoute);
server.use(AuthenticateMW);
server.use(AdminRoute);
  
//404 error not found Middleware
server.use((request,response,next)=>{
    response.status(404).json({message:"Not Found"});
});

//Error Middleware
server.use((error,request,response,next)=>{
    response.status(500).json({message:error+""})
});
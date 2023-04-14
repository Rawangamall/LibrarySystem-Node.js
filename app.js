const express= require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose=require("mongoose");

const AdminRoute=require("./Routes/AdminRoute");
//const loginRoute=require("./Routes/login");
//const AuthenticateMW=require("./Core/auth/AuthenticateMW");
const memberRoute=require("./Routes/memberRoute");
const BookRoute=require("./Routes/BookRoute");
const EmpRoute=require("./Routes/EmpRoute");
const BookOperationRoute=require("./Routes/BookOperationRoute");

//server
const server = express();
let port=process.env.PORT||8080;

//db connection
mongoose.set('strictQuery', true);  //warning
 //mongoose.connect("mongodb://127.0.0.1:27017/Library")
mongoose.connect("mongodb+srv://rawangamaal21:iti@node.gvt5cis.mongodb.net/?retryWrites=true&w=majority")
        .then(()=>{
            console.log("DB connected");
            server.listen(port,()=>{
                console.log("server is listenng.....",port);
            });
        })
        .catch(error=>{
            console.log("Db Problem "+error);
        })

server.use(cors());
server.use(morgan('combined'))

//body parse
server.use(express.json());
server.use(express.urlencoded({extended:false}));


//Routes 
//server.use(loginRoute);
//server.use(AuthenticateMW);
server.use(memberRoute);
server.use(BookRoute);
server.use(EmpRoute);
server.use(BookOperationRoute);
server.use(AdminRoute);

//Not Found Middleware
server.use((request,response,next)=>{
    response.status(404).json({message:"Not Found"})
})

//ERROR handeling Middleware
server.use((error,request,response,next)=>{
    response.status(500).json({message:error+""});
})

const jwt = require("jsonwebtoken") ;
const mongoose = require("mongoose");
require("../Models/EmpModel");
require("../Models/AdminModel");
require("../Models/member");

let AdminSchema=mongoose.model("Admin");
let EmpSchema=mongoose.model("Employees");
let MemberSchema=mongoose.model("member");

exports.login= async (request,response,next)=>{
    console.log(request.body.email);
        let owner = await AdminSchema.findOne({email:request.body.email , password:request.body.password,_id:0});
        let admin = await AdminSchema.findOne({email:request.body.email , password:request.body.password});
        let employee = await EmpSchema.findOne({email:request.body.email , password:request.body.password});
        let member = await MemberSchema.findOne({email:request.body.email , password:request.body.password});
        console.log(member);
        if(admin && admin.Role=="Admin"){
            let token = jwt.sign({
                email:request.body.email,password: request.body.password,role: "Admin"},"OStrack",{expiresIn: "7h"})
                response.status(200).json({message:"Authentecated",token});
        }
        else if(owner)
        {
            let token = jwt.sign({
                email:request.body.email,password: request.body.password,role: "Owner"},"OStrack",{expiresIn: "7h"})
                response.status(200).json({message:"Authentecated",token});
        }
        else if(admin && admin.Role =="BasicAdmin"){
            let token = jwt.sign({
                email:request.body.email,password: request.body.password,role: "BasicAdmin"},"OStrack",{expiresIn: "7h"})
                response.status(200).json({message:"Authentecated",token});
        }
        else if (employee){
            let token = jwt.sign({
                email:request.body.email,password: request.body.password,role: "Employee"},"OStrack",{expiresIn: "5h"})
                response.status(200).json({message:"Authentecated",token});
        }
        else if (member){
           
            let token = jwt.sign({
               
                email:request.body.email,password: request.body.password,role: "Member"},"OStrack",{expiresIn: "5h"})
                response.status(200).json({message:"Authentecated",token});
        }
        else{
          
            let error = new Error("Not Authenticated");
            error.status=401;
            next(error);
        }    
    }


//}
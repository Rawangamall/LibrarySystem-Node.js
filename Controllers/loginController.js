const jwt = require("jsonwebtoken") ;
const mongoose = require("mongoose");
require("../Models/EmpModel");
require("../Models/AdminModel");
require("../Models/member");

let AdminSchema=mongoose.model("Admin");
let EmpSchema=mongoose.model("Employees");
let MemberSchema=mongoose.model("member");

exports.login= async (request,response,next)=>{
<<<<<<< HEAD
    
        let admin = await AdminSchema.findOne({firstName:request.body.firstName , email:request.body.email });
        let employee = await EmpSchema.findOne({firstName:request.body.firstName , email:request.body.email});
        let member = await MemberSchema.findOne({fullName:request.body.fullName , email:request.body.email});
        if(admin && admin.Role=="Admin"){
            let token = jwt.sign({
                firstName: request.body.firstName,role: "Admin"},"OStrack",{expiresIn: "7h"})
                response.status(200).json({message:"authenticated",token});
        }
        else if(admin && admin.Role =="BasicAdmin"){
            let token = jwt.sign({
                firstName: request.body.firstName,role: "BasicAdmin"},"OStrack",{expiresIn: "7h"})
                response.status(200).json({message:"authenticated",token});
        }
        else if (employee){
            let token = jwt.sign({
                firstName: request.body.firstName,role: "Employee"},"OStrack",{expiresIn: "5h"})
                response.status(200).json({message:"authenticated",token});
        }
        else if (member){
            let token = jwt.sign({
                fullName: request.body.fullName,role: "Member"},"OStrack",{expiresIn: "5h"})
                response.status(200).json({message:"authenticated",token});
        }
        else{
            let error = new Error("Not authenticated");
=======
    console.log(request.body.email);
    console.log(request.body.password);
    let admin = await AdminSchema.findOne({email:request.body.email , password:request.body.password});
        let employee = await EmpSchema.findOne({email:request.body.email , password:request.body.password});
        let member = await MemberSchema.findOne({email:request.body.email , password:request.body.password});
        console.log(member);
        if(admin && admin.Role=="Admin"){
            let token = jwt.sign({
                email:request.body.email,password: request.body.password,role: "Admin"},"OStrack",{expiresIn: "7h"})
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
            console.log("jjjjjjjjjjjjjjjj");
            let token = jwt.sign({
               
                email:request.body.email,password: request.body.password,role: "Member"},"OStrack",{expiresIn: "5h"})
                response.status(200).json({message:"Authentecated",token});
        }
        else{
            console.log("gggggggggj");
            let error = new Error("Not Authenticated");
>>>>>>> d9e56d31b48db1f759f76b1685f5ccdf7e486680
            error.status=401;
            next(error);
        }    
    }

//}
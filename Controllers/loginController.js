const jwt = require("jsonwebtoken") ;
const mongoose = require("mongoose");
let AdminSchema=mongoose.model("Admin");
// let EmpSchema=mongoose.model("Employees");
// let MemberSchema=mongoose.model("Members");

exports.login= async (request,response,next)=>{
    
        let admin = await AdminSchema.findOne({firstName:request.body.firstName , email:request.body.email });
        // let employee = await EmpSchema.findOne({firstName:request.body.firstName , email:request.body.email});
        // let member = await MemberSchema.findOne({firstName:request.body.firstName , email:request.body.email});
        if(admin && admin.Role=="Admin"){
            let token = jwt.sign({
                firstName: request.body.firstName,role: "Admin"},"OStrack",{expiresIn: "7h"})
                response.status(200).json({message:"Authentecated",token});
        }
        else if(admin && admin.Role =="BasicAdmin"){
            let token = jwt.sign({
                firstName: request.body.firstName,role: "BasicAdmin"},"OStrack",{expiresIn: "7h"})
                response.status(200).json({message:"Authentecated",token});
        }
        // else if (employee){
        //     let token = jwt.sign({
        //         firstName: request.body.firstName,role: "Employee"},"OStrack",{expiresIn: "5h"})
        //         response.status(200).json({message:"Authentecated",token});
        // }
        // else if (member){
        //     let token = jwt.sign({
        //         firstName: request.body.firstName,role: "Member"},"OStrack",{expiresIn: "5h"})
        //         response.status(200).json({message:"Authentecated",token});
        // }
        else{
            let error = new Error("Not Authenticated");
            error.status=401;
            next(error);
        }    
    }


//}
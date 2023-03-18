const multer=require("multer");
const path=require("path");
const fs = require('fs');
const mongoose=require("mongoose");
const { response } = require("express");
require("../../Models/EmpModel");
require("../../Models/member");
require("../../Models/AdminModel");
const EmpSchema=mongoose.model("Employees");
const MemberSchema=mongoose.model("member");
const AdminSchema=mongoose.model("Admin");

exports.addIMG=multer({
    fileFilter: function (req, file, cb) {
        if (file.mimetype != "image/png" && file.mimetype != "image/jpg" && file.mimetype != "image/jpeg" && file.mimetype != "image/avif") {
            return cb(new Error('Only images are allowed'))
        }
        cb(null, true)
    },
    limits: { fileSize: 10000*10000 },
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            if(req.role=="Employee"){
                cb(null,path.join(__dirname,"..","..","images","Employees_images"));
            }else if(req.role=="Member"){
                cb(null,path.join(__dirname,"..","..","images","Members_images"));
            }else if(req.role=="Admin"){
                cb(null,path.join(__dirname,"..","..","images","Admin_images"));
            }
        },
        filename:(request, file, cb)=>{
            if(request.role=="Employee"){
                EmpSchema.findOne({email:request.email}).then((data)=>{
                    imageName = data._id+ "." + "jpg";
                    cb(null, imageName);
                    console.log(imageName)
                })
                
            }else if(request.role=="Member"){

                MemberSchema.findOne({email:request.email}).then((data)=>{
                    imageName = data._id+ "." + "jpg";
                    cb(null, imageName);
                    console.log(imageName)
                })
           
            }else if(request.role=="Admin"){
                AdminSchema.findOne({email:request.email}).then((data)=>{
                    imageName = data._id+ "." + "jpg";
                    cb(null, imageName);
                    console.log(imageName)
                })
            }
        }
    })
}).single("image")

exports.removeEmpIMG=function(req,res,next){
    EmpSchema.findOne({_id:request.params._id}).then((data)=>{
        if(data != null){
        imageName = data._id+ "." + "jpg";
        console.log(imageName)
        fs.unlink(path.join(__dirname,"..","..","images","Employees_images",imageName), function (err) {
            if (err)
                next(new Error("member not found"));
            else
                next();
        })
    }
    })
}

exports.removeMemberIMG=function(request,res,next){
    MemberSchema.findOne({_id:request.params._id}).then((data)=>{
        if(data != null){
        imageName = data._id+ "." + "jpg";
        console.log(imageName)
        fs.unlink(path.join(__dirname,"..","..","images","Members_images",imageName), function (err) {
            if (err)
                next(new Error("member not found"));
            else
                next();
        })
    }
    }).catch(error=>next(error))
}

exports.removeAdminIMG=function(request,res,next){
    AdminSchema.findOne({_id:request.params._id}).then((data)=>{
        if(data != null){
        imageName = data._id+ "." + "jpg";
        console.log(imageName)
        fs.unlink(path.join(__dirname,"..","..","images","Admins_images",imageName), function (err) {
            if (err)
                next(new Error("member not found"));
            else
                next();
        })
    }
    })
}
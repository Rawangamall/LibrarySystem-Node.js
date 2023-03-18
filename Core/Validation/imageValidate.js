const multer=require("multer");
const path=require("path");
const fs = require('fs');
const mongoose=require("mongoose");
require("../../Models/EmpModel");
require("../../Models/member");
require("../../Models/AdminModel");
const EmpSchema=mongoose.model("Employees");
const MemberSchema=mongoose.model("member");
const AdminSchema=mongoose.model("Admin");
var imageName 

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
                let imageName=EmpSchema.findOne({_id:request.params._id})._conditions._id + ".png";
                cb(null, imageName);
            }else if(request.role=="Member"){
                let imageName=MemberSchema.findOne({_id:request.params._id})._conditions._id + ".png";
                cb(null, imageName);
            }else if(request.role=="Admin"){
                let imageName=AdminSchema.findOne({_id:request.params._id})._conditions._id + ".png";
                cb(null, imageName);
            }
        }
    })
}).single("image")

exports.removeIMG=function(req,res,next){
    if(req.role=="Employee"){
        let imageName=EmpSchema.findOne({_id:req.params._id})._conditions._id + ".png";
        fs.unlink(path.join(__dirname,"..","..","images","Employees_images",imageName), function (err) {
            if (err) throw err;
            next();
        })
    }else if(req.role=="Member"){
        let imageName=MemberSchema.findOne({_id:req.params._id})._conditions._id + ".png";
        fs.unlink(path.join(__dirname,"..","..","images","Members_images",imageName), function (err) {
            if (err) throw err;
            next();
        })
    }else if(req.role=="Admin"){
        let imageName=AdminSchema.findOne({_id:req.params._id})._conditions._id + ".png";
        fs.unlink(path.join(__dirname,"..","..","images","Admin_images",imageName), function (err) {
            if (err) throw err;
            next();
        })
    }
}
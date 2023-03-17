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


exports.empImage=multer({
    fileFilter: function (req, file, cb) {
        if (file.mimetype != "image/png" && file.mimetype != "image/jpg" && file.mimetype != "image/jpeg" && file.mimetype != "image/avif") {
            return cb(new Error('Only images are allowed'))
        }
        cb(null, true)
    },
    limits: { fileSize: 10000*10000 },
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,path.join(__dirname,"..","..","images","Employees_images"));
        },
        filename:(request, file, cb)=>{
                photoExtension = file.originalname.split(".")[1];
                imageName= EmpSchema.findOne({_id:request.body._id})._conditions._id + "." + photoExtension;
                cb(null, imageName);
        }
    })
}).single("image")

exports.removeEmpIMG=function(req,res,next){
    fs.unlink(path.join(__dirname,"..","..","images","Employees_images",imageName), function (err) {
        if (err) throw err;
        next();
    })
}

exports.memberImage=multer({
    fileFilter:function(req, file, cb){
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if(mimetype && extname){
          return cb(null,true);
        }else {
          cb('Error: Images Only!');
               }          
  } ,
    limits: { fileSize: 10000*10000 },
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,path.join(__dirname,"..","..","images","Members_images"));
        },
        filename:(request, file, cb)=>{
                photoExtension = file.originalname.split(".")[1];
                imageName= MemberSchema.findOne({_id:request.params._id})._conditions._id + "." + photoExtension;
                cb(null, imageName);

        }
    })
}).single("image")

exports.removeMemberIMG=function(req,res,next){
    fs.unlink(path.join(__dirname,"..","..","images","Members_images",imageName), function (err) {
        if (err) throw err;
        next();
    })
}

    exports.AdminImage=multer({
        fileFilter: function (req, file, cb) {
            if (file.mimetype != "image/png" && file.mimetype != "image/jpg" && file.mimetype != "image/jpeg" && file.mimetype != "image/avif") {
                return cb(new Error('Only images are allowed'))
            }
            cb(null, true)
        },
        limits: { fileSize: 10000*10000 },
        storage:multer.diskStorage({
            destination:(req,file,cb)=>{
                cb(null,path.join(__dirname,"..","..","images","Admins_images"));
            },
            filename:(request, file, cb)=>{
                    photoExtension = file.originalname.split(".")[1];
                    imageName= AdminSchema.findOne({_id:request.body._id})._conditions._id + "." + photoExtension;
                    cb(null, imageName);
            }
        })
    }).single("image")
    
    exports.removeAdminIMG=function(req,res,next){
        fs.unlink(path.join(__dirname,"..","..","images","Admins_images",imageName), function (err) {
            if (err) throw err;
            next();
        })
    }

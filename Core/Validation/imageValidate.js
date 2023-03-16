const multer=require("multer");
const path=require("path");
const fs = require('fs');
const mongoose=require("mongoose");
require("../../Models/AdminModel");
const AdminSchema=mongoose.model("Admin");

exports.adminImg=multer({
    fileFilter: function (req, file, cb) {
        if (file.mimetype != "image/png" && file.mimetype != "image/jpg" && file.mimetype != "image/jpeg" && file.mimetype != "image/avif") {
            return cb(new Error('Only images are allowed'))
        }
        cb(null, true)
    },
    limits: { fileSize: 100000*100000 },
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,path.join(__dirname,"..","..","images"));
        },
        filename:(request, file, cb)=>{
                photoExtension = file.originalname.split(".")[1];
                imageName= AdminSchema.findOne({_id:request.body.id})._conditions._id + "." + photoExtension;
                cb(null, imageName);
        }
    })
}).single("image")

exports.removeAdminIMG=function(req,res,next){
    fs.unlink(path.join(__dirname,"..","..","images",imageName), function (err) {
        if (err) throw err;
        next();
    })
}
const multer=require("multer");
const path=require("path");
const fs = require('fs');
const mongoose=require("mongoose");
require("../../Models/member");
const MemberSchema=mongoose.model("member");

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
            cb(null,path.join(__dirname,"..","..","images"));
        },
        filename:(request, file, cb)=>{
                photoExtension = file.originalname.split(".")[1];
                imageName= MemberSchema.findOne({_id:request.params._id})._conditions._id + "." + photoExtension;
                cb(null, imageName);

        }
    })
}).single("image")

exports.removeMemberIMG=function(req,res,next){
    fs.unlink(path.join(__dirname,"..","..","images",imageName), function (err) {
        if (err) throw err;
        next();
    })
}

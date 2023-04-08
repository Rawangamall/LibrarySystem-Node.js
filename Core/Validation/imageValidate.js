const MongoClient = require('mongodb').MongoClient;

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
const Bookschema=mongoose.model("Book");


// Connection URL
const url = 'mongodb+srv://rawangamaal21:iti@node.gvt5cis.mongodb.net/?retryWrites=true&w=majority';

// Database Name
const dbName = 'test';

// Collection Name
const counterCollection = 'counters';

// Create a new MongoClient
const client = new MongoClient(url);




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
            }
            else if(req.role=="Admin"||req.role=="BasicAdmin"){
                var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
                if(fullUrl.includes("Book")){
                    cb(null,path.join(__dirname,"..","..","images","Book_images"));
                }else{
                    cb(null,path.join(__dirname,"..","..","images","Admins_images"));
                }
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
           
            }else if(request.role=="Admin"||request.role=="BasicAdmin"){
                var fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
                if(fullUrl.includes("Book")){

               // Connect to the MongoDB server
                    client.connect(function(err) {
                    if (err) throw err;

                    const db = client.db(dbName);
                    const counter = db.collection(counterCollection);
                        counter.findOne({ id: 'Book_id' }, function(err, result) {
                        if (err) throw err;

                        if(result != null){
                        bookid=result.seq + 1;
                        imageName = bookid + "." + "jpg";

                        }else{ imageName = 1 + "." + "jpg";    }
                        cb(null, imageName);
                        client.close();
                    });
                 });
      
                    }else{
                    AdminSchema.findOne({email:request.email}).then((data)=>{
                        imageName = data._id+ "." + "jpg";
                        cb(null, imageName);
                    })
                }

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
const express=require("express");
const multer=require("multer");
const path=require("path");
const validateMW=require("../Core/Validation/validateMW");
const controller=require("../Controllers/EmpController");
const router=express.Router();
const validatePostEmp=require("../Core/Validation/EmpValidation").validatePost;
const validatePutEmp=require("../Core/Validation/EmpValidation").validatePut;
const validateOnGetEmp=require("../Core/Validation/EmpValidation").validateOnGet;
const validateOnDeleteEmp=require("../Core/Validation/EmpValidation").validateOnDelete;
//const { checkAdmin, checkTeacherAndAdmin }=require("./../Core/auth/authenticationMW");

router.route("/Employees")
    .get(controller.getAllEmps)
    .post(multer({
        limits: { fileSize: 100000 },
        storage:multer.diskStorage({
            destination:(req,file,cb)=>{
                cb(null,path.join(__dirname,"..","images"));
            },filename : (req,file,cb)=>{
                if(!file.originalname.match(/\.(png||jpg||avif)$/)){
                    let err = new Error("The extension of the image must be png or jpg or avif");
                    err.code = 'filetype';
                    return cb(err);
                }else{
                    cb(null,file.originalname);
                }
            }
        })
    }).single("image"),validatePostEmp,validateMW)
    .put(validatePutEmp,validateMW,controller.updateEmp)
    .delete(validateOnDeleteEmp,validateMW)

router.get("/Employees/:id",validateOnGetEmp,validateMW,controller.getOneEmp)

module.exports=router;
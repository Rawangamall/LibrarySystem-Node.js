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
  //  .get(controller.getAllEmp)
    .post(multer({
        fileFilter: function (req, file, cb) {
            if (file.mimetype != "image/png" && file.mimetype != "image/jpg" && file.mimetype != "image/jpeg") {
                return cb(new Error('Only images are allowed'))
            }
            cb(null, true)
        },
        limits: { fileSize: 1000*1000 },
        storage:multer.diskStorage({
            destination:(req,file,cb)=>{
                cb(null,path.join(__dirname,"..","images"));
            },
            filename:(req, file, cb)=>{
                    cb(null, file.originalname);
            }
        })
    }).single("image"),validatePostEmp,validateMW,controller.addEmp)              //make it validatePostMember  controller.addMember
    .put(validatePutEmp,validateMW,controller.updateEmp)
    .delete(validateOnDeleteEmp,validateMW)

router.get("/Employees/:id",validateOnGetEmp,validateMW)

module.exports=router;
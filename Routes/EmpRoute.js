const express=require("express");
const validateMW=require("../Core/Validation/validateMW");
const controller=require("../Controllers/EmpController");
const { empImage } = require("../Core/Validation/imageValidate");
const imageValidate=require("../Core/Validation/imageValidate").empImage;
const removeEmpIMG=require("../Core/Validation/imageValidate").removeEmpIMG;
const router=express.Router();
const validatePostEmp=require("../Core/Validation/EmpValidation").validatePost;
const validatePutEmp=require("../Core/Validation/EmpValidation").validatePut;
const validateOnGetEmp=require("../Core/Validation/EmpValidation").validateOnGet;
const validateOnDeleteEmp=require("../Core/Validation/EmpValidation").validateOnDelete;
//const { checkAdmin, checkTeacherAndAdmin }=require("./../Core/auth/authenticationMW");

router.route("/Employees")
    //.get(controller.SearchForEmp)
    .get(controller.getEmps)
    .post(validatePostEmp,validateMW,controller.addEmp)              //make it validatePostMember  controller.addMember
    .put(imageValidate,validatePutEmp,validateMW,controller.updateEmp)
    .delete(validateOnDeleteEmp,validateMW,controller.deleteEmp,removeEmpIMG)

router.get("/Employees/:_id",validateOnGetEmp,validateMW,controller.getOneEmp)

module.exports=router;
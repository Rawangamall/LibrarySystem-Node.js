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
const { checkEmp, checkBaAdminAndAdminAndEmpforEmp, checkBasicAdminAndAdmin }=require("./../Core/auth/AuthenticateMW");

// checkBasicAdminAndEmp

router.route("/Employees")
    .get(checkBasicAdminAndAdmin,validateMW,controller.getEmps) //checkBaAdminAndAdmin
    .post(checkBasicAdminAndAdmin,controller.addEmp) //checkBasicAdminAndAdmin ,validateMW,validatePostEmp

// router.get("/Employees/:_id",checkBaAdminAndAdminAndEmpforEmp,validateOnGetEmp,validateMW,controller.getOneEmp)

router.route("/Employees/:_id")
    .get(checkBaAdminAndAdminAndEmpforEmp,validateOnGetEmp,validateMW,controller.getOneEmp) //checkBaAdminAndAdminAndEmp
    .put(checkEmp,imageValidate,validateMW,validatePutEmp,controller.updateEmp) //checkEmp  //another update function for adminandbadmin
    .delete(checkBasicAdminAndAdmin,validateMW,validateOnDeleteEmp,removeEmpIMG,controller.deleteEmp) //checkBasicAdminAndAdmin

module.exports=router;
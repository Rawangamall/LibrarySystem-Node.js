const express=require("express");
const validateMW=require("../Core/Validation/validateMW");
const controller=require("../Controllers/EmpController");
const { empImage } = require("../Core/Validation/imageValidate");
const imageValidate=require("../Core/Validation/imageValidate").empImage;
const removeEmpIMG=require("../Core/Validation/imageValidate").removeEmpIMG;
const router=express.Router();
const validatePostEmp=require("../Core/Validation/EmpValidation").validatePost;
const validatePutEmp=require("../Core/Validation/EmpValidation").validatePut;
const EmpfirstLogin=require("../Core/Validation/EmpValidation").EmpfirstLogin;
const validateOnIDParams=require("../Core/Validation/EmpValidation").validateOnIDParams;
const { checkBaAdminAndAdminAndEmpforEmp, checkBasicAdminAndAdmin }=require("./../Core/auth/AuthenticateMW");

// checkBasicAdminAndEmp


router.route("/Employees")
    .get(checkBasicAdminAndAdmin,validateMW,controller.getEmps) //checkBaAdminAndAdmin
    .post(checkBasicAdminAndAdmin,controller.addEmp) //checkBasicAdminAndAdmin ,validateMW,validatePostEmp

// router.get("/Employees/:_id",checkBaAdminAndAdminAndEmpforEmp,validateOnGetEmp,validateMW,controller.getOneEmp)

router.route("/Employee/:_id")
    .put(checkBaAdminAndAdminAndEmpforEmp,imageValidate,validateMW,validatePutEmp,controller.updateEmp) //checkBaAdminAndAdminAndEmp
    .delete(checkBasicAdminAndAdmin,validateMW,validateOnIDParams,removeEmpIMG,controller.deleteEmp) //checkBasicAdminAndAdmin
    .get(checkBaAdminAndAdminAndEmpforEmp,validateOnIDParams,validateMW,controller.getOneEmp) //AuthenticateMW.checkBaAdminAndAdminAndEmp,

router.route("/searchForEmp")
    .get(controller.searchForEmp)

router.route("/firstLoginEmp/:_id")
    .put(imageValidate,EmpfirstLogin,controller.updatefirstLogin)

module.exports=router;
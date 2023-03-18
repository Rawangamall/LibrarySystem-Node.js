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
const AuthenticateMW=require("./../Core/auth/AuthenticateMW");

router.route("/Employees")
    .get(validateMW,controller.getEmps) //checkBaAdminAndAdminAndEmp
    .post(validateMW,validatePostEmp,controller.addEmp) //checkBasicAdminAndAdmin

router.route("/Employee/:_id")
    .put(validateMW,validatePutEmp,controller.updateEmp) //checkBaAdminAndAdminAndEmp
    .delete(validateMW,validateOnIDParams,removeEmpIMG,controller.deleteEmp) //checkBasicAdminAndAdmin
    .get(validateOnIDParams,validateMW,controller.getOneEmp) //AuthenticateMW.checkBaAdminAndAdminAndEmp,

router.route("/searchForEmp")
    .put(controller.searchForEmp)

router.route("/firstLoginEmp/:_id")
    .put(imageValidate,EmpfirstLogin,controller.updatefirstLogin)

module.exports=router;
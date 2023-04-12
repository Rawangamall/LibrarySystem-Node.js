const express=require("express");
const validateMW=require("../Core/Validation/validateMW");
const controller=require("../Controllers/EmpController");
const { empImage } = require("../Core/Validation/imageValidate");
const imageValidate=require("../Core/Validation/imageValidate").addIMG;
const removeEmpIMG=require("../Core/Validation/imageValidate").removeEmpIMG;
const router=express.Router();
const validatePostEmp=require("../Core/Validation/EmpValidation").validatePost;
const validatePutEmp=require("../Core/Validation/EmpValidation").validatePut;
const EmpfirstLogin=require("../Core/Validation/EmpValidation").EmpfirstLogin;
const validateOnIDParams=require("../Core/Validation/EmpValidation").validateOnIDParams;
const {checkEmp, checkBaAdminAndAdminAndEmpforEmp, checkBasicAdminAndAdmin }=require("./../Core/auth/AuthenticateMW");

router.route("/Employees")
    .get(controller.getEmps) //checkBasicAdminAndAdmin,validateMW,
    .post(controller.addEmp) //checkBasicAdminAndAdmin,validatePostEmp,validateMW,

router.route("/Employee/:_id")
    .put(controller.updateEmp) //checkBaAdminAndAdminAndEmpforEmp,imageValidate,validateMW,validatePutEmp,
    .delete(controller.deleteEmp) //removeEmpIMG,checkBasicAdminAndAdmin,validateMW,validateOnIDParams,
    .get(controller.getOneEmp) //checkBaAdminAndAdminAndEmpforEmp,validateOnIDParams,validateMW,

// router.route("/Employee/update/:_id")

router.route("/searchForEmp")
    .get(checkBasicAdminAndAdmin,validateMW,controller.searchForEmp)

router.route("/firstLoginEmp/:_id")
    .put(EmpfirstLogin,controller.updatefirstLogin) //checkEmp,imageValidate,validateMW,

module.exports=router;
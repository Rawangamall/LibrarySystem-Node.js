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
    .get(checkBasicAdminAndAdmin,validateMW,controller.getEmps)
    .post(checkBasicAdminAndAdmin,validatePostEmp,validateMW,controller.addEmp) 

router.route("/Employee/:_id")
    .put(checkBaAdminAndAdminAndEmpforEmp,imageValidate,validateMW,validatePutEmp,controller.updateEmp) 
    .delete(checkBasicAdminAndAdmin,validateMW,validateOnIDParams,removeEmpIMG,controller.deleteEmp) 
    .get(checkBaAdminAndAdminAndEmpforEmp,validateOnIDParams,validateMW,controller.getOneEmp) 

router.route("/Employee/:_id")
    .put(validateMW,controller.updateEmp)

    router.route("/Employees/search")
    .post(checkBasicAdminAndAdmin,validateMW,controller.searchForEmp)

router.route("/firstLoginEmp/:_id")
    .patch(checkEmp,validateMW,EmpfirstLogin,controller.updatefirstLogin) //empImage

module.exports=router;
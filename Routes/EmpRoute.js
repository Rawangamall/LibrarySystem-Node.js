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
    .post(checkBasicAdminAndAdmin,validateMW,validatePostEmp,controller.addEmp)

router.route("/Employee/:_id")
    .delete(removeEmpIMG,checkBasicAdminAndAdmin,validateMW,validateOnIDParams,controller.deleteEmp)
    .get(controller.getOneEmp)

router.route("/Employee/:_id")
    .put(controller.updateEmp)
router.route("/searchForEmp")
    .get(checkBasicAdminAndAdmin,validateMW,controller.searchForEmp)

router.route("/firstLoginEmp/:_id")
    .put(checkEmp,imageValidate,validateMW,EmpfirstLogin,controller.updatefirstLogin)

module.exports=router;
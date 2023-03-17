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
const { checkBasicAdminAndAdmin, checkBasicAdminAndEmp, checkBaAdminAndAdminAndEmp, checkBaAdminAndMemberAndEmp }=require("./../Core/auth/AuthenticateMW");

router.route("/Employees")
    .get(checkBaAdminAndAdminAndEmp,validateMW,controller.getEmps)
    .post(validateMW,validatePostEmp,controller.addEmp) //checkBasicAdminAndAdmin

router.get("/Employees/:_id",validateMW,validateOnGetEmp,controller.getOneEmp) //checkBaAdminAndAdminAndEmp

router.route("/Employees/:_id")
    .put(imageValidate,validateMW,validatePutEmp,controller.updateEmp) //checkBaAdminAndAdminAndEmp
    .delete(validateMW,validateOnDeleteEmp,removeEmpIMG,controller.deleteEmp) //checkBasicAdminAndAdmin

module.exports=router;
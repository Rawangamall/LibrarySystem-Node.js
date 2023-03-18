const express=require("express");

const validateMW=require("./../Core/Validation/validateMW");
const controller=require("./../Controllers/AdminController");
const { AdminImag } = require("../Core/Validation/imageValidate");
const imageValidate=require("./../Core/Validation/imageValidate").addIMG;
const removeAdminIMG=require("./../Core/Validation/imageValidate").removeIMG;
const AdminValidate=require("./../Core/Validation/AdminValidate");
const adminFirstLogin=require("./../Core/Validation/AdminValidate").adminFirstLogin;
const { checkBasicAdminAndAdmin }=require("./../Core/auth/AuthenticateMW");
const router=express.Router();
const { checkBasicAdmin, checkBasicAdminAndAdminforAdmin }=require("./../Core/auth/AuthenticateMW");

router.route("/Admin")
    .get(checkBasicAdmin,validateMW,controller.getAllAdmins)
    .post(checkBasicAdmin,validateMW,controller.addAdmin) //imageValidate,//AdminValidate.validateAdminPost,
    .put(checkBasicAdminAndAdminforAdmin,imageValidate,AdminValidate.validateAdminPut,validateMW,controller.updateAdmin) 

router.route("/Admin/:_id")
    .get(checkBasicAdminAndAdminforAdmin,AdminValidate.validateIDParams,validateMW,controller.getAdmin)
    .delete(checkBasicAdminAndAdminforAdmin,AdminValidate.validateIDParams,validateMW,removeAdminIMG,controller.deleteAdmin)

router.get("/report",checkBasicAdminAndAdmin,validateMW,controller.report)

router.get("/searchForAdmin",checkBasicAdmin,controller.searchForAdmin)

router.route("/firstLoginAdmin/:_id")
    .put(imageValidate,adminFirstLogin,controller.updatefirstLogin)

module.exports=router;
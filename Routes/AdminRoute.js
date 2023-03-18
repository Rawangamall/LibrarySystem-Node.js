const express=require("express");

const validateMW=require("./../Core/Validation/validateMW");
const controller=require("./../Controllers/AdminController");
const { AdminImag } = require("../Core/Validation/imageValidate");
const imageValidate=require("./../Core/Validation/imageValidate").AdminImage;
const removeAdminIMG=require("./../Core/Validation/imageValidate").removeAdminIMG;
const AdminValidate=require("./../Core/Validation/AdminValidate")
const router=express.Router();
const { checkBasicAdmin, checkBasicAdminAndAdminforAdmin }=require("./../Core/auth/AuthenticateMW");

router.route("/Admin")
    .get(checkBasicAdmin,validateMW,controller.getAllAdmins)
    .post(checkBasicAdmin,validateMW,controller.addAdmin) //imageValidate,//AdminValidate.validateAdminPost,
    .put(checkBasicAdminAndAdminforAdmin,imageValidate,AdminValidate.validateAdminPut,validateMW,controller.updateAdmin) 

router.route("/Admin/:_id")
    .get(checkBasicAdminAndAdminforAdmin,AdminValidate.validateAdminGetID,validateMW,controller.getAdmin)
    .delete(checkBasicAdminAndAdminforAdmin,removeAdminIMG,AdminValidate.validateAdminDelete,validateMW,controller.deleteAdmin)

module.exports=router;
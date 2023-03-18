const express=require("express");

const validateMW=require("./../Core/Validation/validateMW");
const controller=require("./../Controllers/AdminController");
const { AdminImag } = require("../Core/Validation/imageValidate");
const imageValidate=require("./../Core/Validation/imageValidate").AdminImage;
const removeAdminIMG=require("./../Core/Validation/imageValidate").removeAdminIMG;
const AdminValidate=require("./../Core/Validation/AdminValidate");
const adminFirstLogin=require("./../Core/Validation/AdminValidate").adminFirstLogin;
const { checkBasicAdminAndAdmin }=require("./../Core/auth/AuthenticateMW");
const router=express.Router();

router.route("/Admin")
    .get(validateMW,controller.getAllAdmins)
    .post(validateMW,controller.addAdmin) //imageValidate,//AdminValidate.validateAdminPost,
    .put(imageValidate,AdminValidate.validateAdminPut,validateMW,controller.updateAdmin) 


router.get("/Admin/:_id",AdminValidate.validateIDParams,validateMW,controller.getAdmin)
router.delete("/Admin/:_id",removeAdminIMG,AdminValidate.validateIDParams,validateMW,controller.deleteAdmin)

router.get("/report",checkBasicAdminAndAdmin,validateMW,controller.report)

router.get("/searchForAdmin",controller.searchForAdmin)

router.route("/firstLoginAdmin/:_id")
    .put(imageValidate,adminFirstLogin,controller.updatefirstLogin)

module.exports=router;
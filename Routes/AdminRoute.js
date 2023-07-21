const express=require("express");

const validateMW=require("./../Core/Validation/validateMW");
const controller=require("./../Controllers/AdminController");
const { AdminImag } = require("../Core/Validation/imageValidate");
const imageValidate=require("./../Core/Validation/imageValidate").addIMG;
const removeAdminIMG=require("./../Core/Validation/imageValidate").removeAdminIMG;
const AdminValidate=require("./../Core/Validation/AdminValidate");
const adminFirstLogin=require("./../Core/Validation/AdminValidate").adminFirstLogin;
const { checkBasicAdminAndAdmin, checkOwn }=require("./../Core/auth/AuthenticateMW");
const router=express.Router();
const { checkBasicAdmin, checkBasicAdminAndAdminforAdmin }=require("./../Core/auth/AuthenticateMW");

//Admin
router.route("/Admins")
    .get(controller.getAllAdmins)
    .post(controller.addAdmins) //imageValidate,//AdminValidate.validateAdminPost,
    
router.route("/Admin/:_id")
      .get(validateMW,controller.getAdmin)
      .put(validateMW,controller.updateAdmin) //checkBasicAdminAndAdmin,imageValidate,AdminValidate.validateAdminPut,
      .delete(validateMW,controller.deleteAdmin)//checkBasicAdmin,removeAdminIMG,AdminValidate.validateIDParams,

//BasicAdmin
router.route("/Basics")
    .get(controller.getAllBasicAdmins)//checkBasicAdmin
    .post(controller.addAdmins)//checkOwn, //imageValidate,//AdminValidate.validateAdminPost,
    
router.route("/BasicAdmin/:_id")
       .put(validateMW,controller.updateBasicAdmin) //checkBasicAdmin,imageValidate,AdminValidate.validateAdminPut,
       .get(validateMW,controller.getBasicAdmin)//checkBasicAdmin,AdminValidate.validateIDParams,
       .delete(controller.deleteBasicAdmin)//checkOwn,AdminValidate.validateIDParams,validateMW,removeAdminIMG,

//owner
router.route("/ownerGetsAll").get(validateMW,controller.getAllKindsAdmins)
router.put("/owner/:_id",checkOwn,imageValidate,AdminValidate.validateAdminPut,validateMW,controller.updateOwner)
router.get("/owner/:_id",checkOwn,AdminValidate.validateIDParams,validateMW,controller.getOwner)

//report
router.get("/report",checkBasicAdminAndAdmin,validateMW,controller.report)

router.get("/searchForAdmin",checkBasicAdmin,controller.searchForAdmin)

//firstlogin
router.route("/firstLoginAdmin/:_id")
    .patch(imageValidate,adminFirstLogin,controller.updatefirstLogin)

module.exports=router;
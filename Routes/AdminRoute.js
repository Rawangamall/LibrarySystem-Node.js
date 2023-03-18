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
router.route("/Admin")
    .get(checkBasicAdminAndAdmin,validateMW,controller.getAllAdmins)
    .post(checkBasicAdmin,validateMW,controller.addAdmins) //imageValidate,//AdminValidate.validateAdminPost,
    
router.route("/Admin/:_id")
      .get(checkBasicAdminAndAdmin,AdminValidate.validateIDParams,validateMW,controller.getAdmin)
      .put(checkBasicAdminAndAdmin,imageValidate,AdminValidate.validateAdminPut,validateMW,controller.updateAdmin) 
      .delete(checkBasicAdmin,AdminValidate.validateIDParams,validateMW,removeAdminIMG,controller.deleteAdmin)

//BasicAdmin
router.route("/Basic")
    .get(checkBasicAdmin,validateMW,controller.getAllBasicAdmins)
    .post(checkOwn,validateMW,controller.addAdmins) //imageValidate,//AdminValidate.validateAdminPost,
    
router.route("/Basic/:_id")
       .put(checkBasicAdmin,imageValidate,AdminValidate.validateAdminPut,validateMW,controller.updateBasicAdmin) 
       .get(checkBasicAdmin,AdminValidate.validateIDParams,validateMW,controller.getBasicAdmin)
       .delete(checkOwn,AdminValidate.validateIDParams,validateMW,removeAdminIMG,controller.deleteBasicAdmin)

//owner
router.route("/ownerGetsAll").get(checkOwn,validateMW,controller.getAllKindsAdmins)
router.put("/owner/:_id",checkOwn,imageValidate,AdminValidate.validateAdminPut,validateMW,controller.updateOwner)
router.get("/owner/:_id",checkOwn,AdminValidate.validateIDParams,validateMW,controller.getOwner)

//report
router.get("/report",checkBasicAdminAndAdmin,validateMW,controller.report)

router.get("/searchForAdmin",checkBasicAdmin,controller.searchForAdmin)

//firstlogin
router.route("/firstLoginAdmin/:_id")
    .put(imageValidate,adminFirstLogin,controller.updatefirstLogin)

module.exports=router;
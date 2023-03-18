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

//Admin
router.route("/Admin")
    .get(validateMW,controller.getAllAdmins)
    .post(validateMW,controller.addAdmins) //imageValidate,//AdminValidate.validateAdminPost,
    
router.route("/Admin/:id")
      .get(AdminValidate.validateIDParams,validateMW,controller.getAdmin)
      .put(imageValidate,AdminValidate.validateAdminPut,validateMW,controller.updateAdmin) 
      .delete(AdminValidate.validateIDParams,validateMW,removeAdminIMG,controller.deleteAdmin)

//BasicAdmin
router.route("/Basic")
    .get(validateMW,controller.getAllBasicAdmins)
    .post(validateMW,controller.addAdmins) //imageValidate,//AdminValidate.validateAdminPost,
    
router.route("/Basic/:_id")
       .put(imageValidate,AdminValidate.validateAdminPut,validateMW,controller.updateBasicAdmin) 
       .get(AdminValidate.validateIDParams,validateMW,controller.getBasicAdmin)
       .delete(AdminValidate.validateIDParams,validateMW,removeAdminIMG,controller.deleteBasicAdmin)

//owner
router.route("/ownerGetsAll").get(validateMW,controller.getAllKindsAdmins)
router.put("/owner/:_id",imageValidate,AdminValidate.validateAdminPut,validateMW,controller.updateOwner)
router.get("/owner/:_id",AdminValidate.validateIDParams,validateMW,controller.getOwner)

//report
router.get("/report",checkBasicAdminAndAdmin,validateMW,controller.report)

//Search
router.get("/searchForAdmin",controller.searchForAdmin)

//firstlogin
router.route("/firstLoginAdmin/:_id")
    .put(imageValidate,adminFirstLogin,controller.updatefirstLogin)

module.exports=router;
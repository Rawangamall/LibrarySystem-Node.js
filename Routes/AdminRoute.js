const express=require("express");
const validateMW=require("./../Core/Validation/validateMW");
const controller=require("./../Controllers/AdminController");
const {adminImg} = require("../Core/Validation/imageValidate");
const imageAdminValidate=require("../Core/Validation/imageValidate").adminImg;
const removeAdminIMG=require("../Core/Validation/imageValidate").removeAdminIMG;
const AdminValidate=require("./../Core/validation/AdminValidate")
const router=express.Router();


router.route("/Admin")
    .get(validateMW,controller.getAllAdmins)
    .post(imageAdminValidate,AdminValidate.validateAdminPost,validateMW,controller.addAdmin)
    .put(imageAdminValidate,AdminValidate.validateAdminPut,validateMW,controller.updateAdmin)
    



router.get("/Admin/:_id",AdminValidate.validateAdminGetID,validateMW,controller.getAdmin)
router.delete("/Admin/:_id",AdminValidate.validateAdminDelete,validateMW,controller.deleteAdmin,removeAdminIMG)


module.exports=router;
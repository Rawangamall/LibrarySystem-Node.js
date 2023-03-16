const express=require("express");
const router=express.Router();
const validateMW=require("./../Core/Validation/validateMW");
const controller=require("./../Controllers/AdminController");
const imageValidate=require("../Core/Validation/imageValidate").AdminImage;
const removeAdminIMG=require("../Core/Validation/imageValidate").removeAdminIMG;
const AdminValidate=require("./../Core/validation/AdminValidate")

router.route("/Admin")
    .get(validateMW,controller.getAllAdmins)
    .post(imageValidate,AdminValidate.validateAdminPost,validateMW,controller.addAdmin)
    .put(imageValidate,AdminValidate.validateAdminPut,validateMW,controller.updateAdmin)


router.get("/Admin/:_id",AdminValidate.validateAdminGetID,validateMW,controller.getAdmin)
router.delete("/Admin/:_id",AdminValidate.validateAdminDelete,validateMW,controller.deleteAdmin) //removeAdminIMG

module.exports=router;
const express=require("express");
const router=express.Router();


const validateMW=require("../Core/Validation/validateMW");
const validateData=require("./../Core/Validation/memberData");
const memberController=require("./../Controllers/memberController");
const BookController=require("./../Controllers/BookController");
//const updatefirstLogin=require("../Controllers/memberController").updatefirstLogin;
const imageValidate=require("../Core/Validation/imageValidate").memberImage;
const removeimage=require("../Core/Validation/imageValidate").removeMemberIMG;
const { checkBasicAdminAndEmp, checkBaAdminAndAdminAndEmpforMember, checkBaAdminAndMemberAndEmp }=require("./../Core/auth/AuthenticateMW");
    


router.route("/members")
       .get( checkBaAdminAndAdminAndEmpforMember, validateMW ,memberController.getAll)
       .post( checkBasicAdminAndEmp,validateMW,memberController.addMember)
       
       
router.route("/member/:_id")
        .patch(imageValidate,validateData.memberArrayPatch,memberController.updateMember)  ///patch and update not authorized yet
        .get(checkBaAdminAndMemberAndEmp,validateMW, memberController.getMember)
        .delete(checkBasicAdminAndEmp,validateData.memberArrayDel,validateMW,memberController.deleteMember,removeimage)

router.route("/firstLogin/:_id")
        .patch(imageValidate,memberController.updatefirstLogin)
 

 router.route("/member/currentBorrowedBooks/:_id")
       .get(checkBaAdminAndMemberAndEmp,validateMW,memberController.currentBorrowedBooks)
 
      
module.exports=router;

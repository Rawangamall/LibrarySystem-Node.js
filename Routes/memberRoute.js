const express=require("express");
const router=express.Router();
const validateMW=require("../Core/Validation/validateMW");
const validateData=require("./../Core/Validation/memberData");
const memberController=require("./../Controllers/memberController");
const imageValidate=require("../Core/Validation/imageValidate").addIMG;
const removeimage=require("../Core/Validation/imageValidate").removeMemberIMG;
const { checkMember,checkBasicAdminAndEmp, checkBaAdminAndMemberAndEmp }=require("./../Core/auth/AuthenticateMW");
    

  
  
router.route("/members")
       .get(memberController.getAll) //checkBasicAdminAndEmp,validateMW ,
       .post(memberController.addMember) //checkBasicAdminAndEmp,validateMW,
       
router.route("/member/:_id")
        .patch(checkBaAdminAndMemberAndEmp,imageValidate,validateData.memberArrayPatch,memberController.updateMember)
        .get(memberController.getMember) //checkBaAdminAndMemberAndEmp,validateData.memberIDParams,
        .delete(checkBasicAdminAndEmp,validateData.memberIDParams,removeimage,memberController.deleteMember)

router.route("/firstLogin/:_id")
        .patch(checkMember,imageValidate,validateData.MemberfirstLogin,memberController.updatefirstLogin)
 
router.get("/searchForMember",checkBasicAdminAndEmp,memberController.searchForMember)        
        
 router.route("/member/currentBorrowedBooks/:_id")
       .get(checkBaAdminAndMemberAndEmp,validateMW,memberController.currentBorrowedBooks)

router.route("/member/borrowInfoOneMember/:_id")
       .get(checkBaAdminAndMemberAndEmp,memberController.borrowInfoOneMember)
      
module.exports=router;
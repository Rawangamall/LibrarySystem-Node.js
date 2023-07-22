const express=require("express");
const router=express.Router();
const validateMW=require("../Core/Validation/validateMW");
const validateData=require("./../Core/Validation/memberData");
const memberController=require("./../Controllers/memberController");
const imageValidate=require("../Core/Validation/imageValidate").addIMG;
const removeimage=require("../Core/Validation/imageValidate").removeMemberIMG;
const {checkMember,checkBasicAdminAndEmp, checkBaAdminAndMemberAndEmp }=require("./../Core/auth/AuthenticateMW");
    

router.route("/members")
       .get(checkBasicAdminAndEmp,validateMW ,memberController.getAll)
       .post(checkBasicAdminAndEmp,validateMW,imageValidate,validateMW,memberController.addMember)
           
router.route("/member/:_id")
        .put(memberController.updateMember)
        .get(checkBaAdminAndMemberAndEmp,validateData.memberIDParams,memberController.getMember) 
        .delete(checkBasicAdminAndEmp,validateData.memberIDParams,memberController.deleteMember,removeimage) 


router.route("/firstLogin/:_id")
        .patch(checkMember,imageValidate,validateData.MemberfirstLogin,memberController.updatefirstLogin)
 
router.post("/members/search",checkBasicAdminAndEmp , memberController.searchForMember)  
        
 router.route("/member/currentBorrowedBooks/:_id")
       .get(checkBaAdminAndMemberAndEmp,validateMW,memberController.currentBorrowedBooks)

router.route("/member/borrowInfoOneMember/:_id")
       .get(checkBaAdminAndMemberAndEmp,memberController.borrowInfoOneMember)
      
module.exports=router;
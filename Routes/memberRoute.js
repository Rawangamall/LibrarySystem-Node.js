const express=require("express");
const router=express.Router();
const validateMW=require("../Core/Validation/validateMW");
const validateData=require("./../Core/Validation/memberData");
const memberController=require("./../Controllers/memberController");
const imageValidate=require("../Core/Validation/imageValidate").addIMG;
const removeimage=require("../Core/Validation/imageValidate").removeMemberIMG;
const {checkAdmin, checkMember,checkBasicAdminAndEmp, checkBaAdminAndMemberAndEmp }=require("./../Core/auth/AuthenticateMW");
    
// const upload = multer();
  
  
router.route("/members")
       .get(memberController.getAll)//checkBasicAdminAndEmp,validateMW ,
       .post(memberController.addMember)//checkBasicAdminAndEmp,validateMW,imageValidate,validateMW,
           
router.route("/member/:_id")
        .put(memberController.updateMember)
        .get(memberController.getMember) //checkBaAdminAndMemberAndEmp,validateData.memberIDParams,
        .delete(checkBasicAdminAndEmp,validateData.memberIDParams,memberController.deleteMember) //remove img


router.route("/firstLogin/:_id")
        .patch(checkMember,imageValidate,validateData.MemberfirstLogin,memberController.updatefirstLogin)
 
router.post("/members/search",memberController.searchForMember)    //checkBasicAdminAndEmp    
        
 router.route("/member/currentBorrowedBooks/:_id")
       .get(checkBaAdminAndMemberAndEmp,validateMW,memberController.currentBorrowedBooks)

router.route("/member/borrowInfoOneMember/:_id")
       .get(checkBaAdminAndMemberAndEmp,memberController.borrowInfoOneMember)
      
module.exports=router;
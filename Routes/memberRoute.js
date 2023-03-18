const express=require("express");
const router=express.Router();
const validateMW=require("../Core/Validation/validateMW");
const validateData=require("./../Core/Validation/memberData");
const memberController=require("./../Controllers/memberController");
const BookController=require("./../Controllers/BookController");
//const updatefirstLogin=require("../Controllers/memberController").updatefirstLogin;
const imageValidate=require("../Core/Validation/imageValidate").memberImage;
const removeimage=require("../Core/Validation/imageValidate").removeMemberIMG;
const { checkBasicAdminAndEmp, checkBaAdminAndAdminAndEmp, checkBaAdminAndMemberAndEmp }=require("./../Core/auth/AuthenticateMW");
      
router.route("/member")
       .get(memberController.getAll)
      .post(validateData.memberArrayPOST,memberController.addMember) //checkBasicAdminAndEmp,
   
router.route("/member/:_id")
        .patch(imageValidate,validateData.memberArrayPatch,memberController.updateMember)
        .get(checkBaAdminAndMemberAndEmp,validateData.memberIDParams,memberController.getMember)
        .delete(validateData.memberIDParams,removeimage,memberController.deleteMember) //checkBasicAdminAndEmp

router.route("/firstLogin/:_id")
        .patch(imageValidate,memberController.updatefirstLogin)
 
        
// router.route("/member/getborrowed/:_id")
//        .get(memberController.getborrowedBooks)

// router.route("/member/getread/:_id")
//         .get(memberController.getReadBooks)


 router.route("/member/getCurrentborrowed/:_id")
       .get(memberController.currentBorrowedBooks)
 

router.route("/member/getCurrentborrowed/:_id")
       .get(memberController.currentBorrowedBooks)
       
module.exports=router;

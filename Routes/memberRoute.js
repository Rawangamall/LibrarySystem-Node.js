const express=require("express");
const router=express.Router();

const AuthenticateMW=require("./../Core/auth/AuthenticateMW");

const validateMW=require("../Core/Validation/validateMW");
const validateData=require("./../Core/Validation/memberData");
const memberController=require("./../Controllers/memberController");
const BookController=require("./../Controllers/BookController");
const imageValidate=require("../Core/Validation/imageValidate").memberImage;
const removeimage=require("../Core/Validation/imageValidate").removeMemberIMG;

      
router.route("/members")
       .get( AuthenticateMW.checkBaAdminAndAdminAndEmp, validateMW ,memberController.getAll)
       .post( AuthenticateMW.checkBasicAdminAndEmp,validateMW,memberController.addMember)
       
       
router.route("/member/:_id")
        .patch(imageValidate,validateData.memberArrayPatch,memberController.updateMember)  ///patch and update not authorized yet
        .get(AuthenticateMW.checkBaAdminAndMemberAndEmp,validateMW, memberController.getMember)
        .delete(AuthenticateMW.checkBasicAdminAndEmp,validateData.memberArrayDel,validateMW,memberController.deleteMember,removeimage)

        
// router.route("/member/getborrowed/:_id")
//        .get(memberController.getborrowedBooks)

// router.route("/member/getread/:_id")
//         .get(memberController.getReadBooks)


 router.route("/member/currentBorrowedBooks/:_id")
       .get(AuthenticateMW.checkBaAdminAndMemberAndEmp,validateMW,memberController.currentBorrowedBooks)
 
      
module.exports=router;

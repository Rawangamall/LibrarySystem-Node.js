const express=require("express");
const router=express.Router();
const validateData=require("./../Core/Validation/memberData");
const memberController=require("./../Controllers/memberController");
const BookController=require("./../Controllers/BookController");
const imageValidate=require("../Core/Validation/imageValidate").memberImage;
const removeEmpIMG=require("../Core/Validation/imageValidate").removeMemberIMG;
      
router.route("/member")
       .get(memberController.getAll)
      .post(imageValidate,validateData.memberArrayPOST,memberController.addMember)
      
router.route("/member/:_id")
        .patch(imageValidate,validateData.memberArrayPatch,memberController.updateMember)
        .delete(validateData.memberArrayDel,memberController.deleteMember,removeEmpIMG)
        .get(memberController.getMember)

        
// router.route("/member/getborrowed/:_id")
//        .get(memberController.getborrowedBooks)

// router.route("/member/getread/:_id")
//         .get(memberController.getReadBooks)


 router.route("/member/getCurrentborrowed/:_id")
       .get(memberController.currentBorrowedBooks)
 

router.route("/member/getCurrentborrowed/:_id")
       .get(memberController.currentBorrowedBooks)
       
module.exports=router;

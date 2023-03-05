const express=require("express");
const router=express.Router();
const validateData=require("./../Core/Validation/memberData");
const memberController=require("./../Controllers/memberController");
      
router.route("/member")
       .get(memberController.getAll)
      .post(memberController.addMember)
      
router.route("/member/:_id")
        .patch(validateData.memberArrayPatch,memberController.updateMember)
        .delete(validateData.memberArrayDel,memberController.deleteMember)
        .get(memberController.getMember)

router.route("/member/getborrowed/:_id")
//        .get(memberController.getborrowedMonth)
       .post(memberController.addBorrowbook)
       .get(memberController.getborrowedBooks)
       .post(memberController.addBorrowbook)

router.route("/member/arrivedBooks/get")
       .get(memberController.getNewArrivedBooks)

//  router.route("/member/borrowedBooks/:_id")
//        .get(memberController.currentBorrowedBooks)
       

module.exports=router;

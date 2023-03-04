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
module.exports=router;
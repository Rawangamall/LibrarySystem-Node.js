const express=require("express");
const router=express.Router();
const validateData=require("./../Core/Validation/memberData");
const memberController=require("./../Controllers/memberController");
      

router.route("/member")
     // .get()
      .post(validateData.memberArrayPOST)
      
router.route("/member/:_id")
        .patch(validateData.memberArrayPatch)
        .delete(validateData.memberArrayDel)


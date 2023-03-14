const express=require("express");
const validateMW=require("../Core/Validation/validateMW");
const controller=require("../Controllers/BookOperationController.js");
const router=express.Router();
// const validatePostBook=require("../Core/Validation/BookValidation").validatePost;
// const validatePutBook=require("../Core/Validation/BookValidation").validatePut;
// const validateOnGetBook=require("../Core/Validation/BookValidation").validateOnGet;
// const validateOnDeleteBook=require("../Core/Validation/BookValidation").validateOnDelete;
//const { checkAdmin, checkTeacherAndAdmin }=require("./../Core/auth/authenticationMW");

router.route("/BookOperation")
    .get(controller.getAll)
    .post(controller.addBookOperation)
   

 router.route("/BookOperation/:_id")
    .patch(controller.updateBookOperation)
    .delete(controller.deleteBookOperation)
    .get(controller.getBookOperation)





module.exports=router;
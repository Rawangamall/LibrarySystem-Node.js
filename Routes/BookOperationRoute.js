const express=require("express");
const validateMW=require("../Core/Validation/validateMW");
const controller=require("../Controllers/BookOperationController.js");
const router=express.Router();
// const validatePostBook=require("../Core/Validation/BookValidation").validatePost;
// const validatePutBook=require("../Core/Validation/BookValidation").validatePut;
// const validateOnGetBook=require("../Core/Validation/BookValidation").validateOnGet;
// const validateOnDeleteBook=require("../Core/Validation/BookValidation").validateOnDelete;
//const { checkAdmin, checkTeacherAndAdmin }=require("./../Core/auth/authenticationMW");

router.route("/Employees/addBorrowedBooks/:_id")
       .post(controller.addBorrowbook)

router.route("/Employees/returnBook/:_id")
       .put(controller.returnBook)

router.route("/Employees/addReadBooks/:_id")
        .post(controller.addReadbook)

module.exports=router;
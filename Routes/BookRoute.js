const express=require("express");
const validateMW=require("../Core/Validation/validateMW");
const controller=require("../Controllers/BookController.js");
const router=express.Router();
const validatePostEmp=require("../Core/Validation/BookValidation").validatePost;
const validatePutEmp=require("../Core/Validation/BookValidation").validatePut;
const validateOnGetEmp=require("../Core/Validation/BookValidation").validateOnGet;
const validateOnDeleteEmp=require("../Core/Validation/BookValidation").validateOnDelete;
//const { checkAdmin, checkTeacherAndAdmin }=require("./../Core/auth/authenticationMW");

router.route("/Employees")
    .get(controller.getBooks)
    .post(validatePostBook,validateMW,controller.addBook)              //make it validatePostMember  controller.addMember
    .put(validatePutBook,validateMW,controller.updateBook)
    .delete(validateOnDeleteBook,validateMW,controller.deleteBook)

router.get("/Book/:id",validateOnGetBook,validateMW,controller.getOneBook)

module.exports=router;
const express=require("express");
const validateMW=require("../Core/Validation/validateMW");
const controller=require("../Controllers/BookController.js");
const router=express.Router();
const validatePostBook=require("../Core/Validation/BookValidation").validatePost;
const validatePutBook=require("../Core/Validation/BookValidation").validatePut;
const validateOnGetBook=require("../Core/Validation/BookValidation").validateOnGet;
const validateOnDeleteBook=require("../Core/Validation/BookValidation").validateOnDelete;
//const { checkAdmin, checkTeacherAndAdmin }=require("./../Core/auth/authenticationMW");

router.route("/Book")
    .get(controller.getBooks)
    .post(validatePostBook,validateMW,controller.addBook)              //make it validatePostMember  controller.addMember
    .put(validatePutBook,validateMW,controller.updateBook)
    .delete(validateOnDeleteBook,validateMW,controller.deleteBook)

router.get("/Book/available",controller.getAvailableBooks)

router.get("/Book/:id",validateOnGetBook,validateMW,controller.getOneBook)

module.exports=router;
const express=require("express");
const router=express.Router();

const validateMW=require("../Core/Validation/validateMW");
const controller=require("../Controllers/BookController.js");
const validatePostBook=require("../Core/Validation/BookValidation").validatePost;
const validatePutBook=require("../Core/Validation/BookValidation").validatePut;
const validateOnGetBook=require("../Core/Validation/BookValidation").validateOnGet;
const validateOnDeleteBook=require("../Core/Validation/BookValidation").validateOnDelete;

//const { checkAdmin, checkTeacherAndAdmin }=require("./../Core/auth/authenticationMW");

router.route("/Book")
    .get(controller.getBooks)
    .post(validateMW,controller.addBook)              //make it validatePostMember  controller.addMember
    .put(validatePutBook,validateMW,controller.updateBook)
    .delete(validateOnDeleteBook,validateMW,controller.deleteBook)

router.get("/Book/available",controller.getAvailableBooks)
router.get("/Book/mostBorrowedBooks",controller.mostBorrowedBooks)
router.get("/Book/mostreadingBooks",controller.mostreadingBooks)

router.get("/Book/:id",validateOnGetBook,validateMW,controller.getOneBook)
router.route("/member/NewArrivedBooks/get")
       .get(controller.getNewArrivedBooks)

router.route("/Book/filterBooks/get")
      .get(controller.filteredbooks)

module.exports=router;
const express=require("express");
const router=express.Router();

const validateMW=require("../Core/Validation/validateMW");
const BookOperationValidation=require("../Core/Validation/BookOperationValidation");

const controller=require("../Controllers/BookOperationController.js");

// const validatePostBook=require("../Core/Validation/BookValidation").validatePost;
// const validatePutBook=require("../Core/Validation/BookValidation").validatePut;
// const validateOnGetBook=require("../Core/Validation/BookValidation").validateOnGet;
// const validateOnDeleteBook=require("../Core/Validation/BookValidation").validateOnDelete;
//const { checkAdmin, checkTeacherAndAdmin }=require("./../Core/auth/authenticationMW");

//     .put(validatePutBook,validateMW,controller.updateBook)
//     .delete(validateOnDeleteBook,validateMW,controller.deleteBook)

// router.get("/Book/available",controller.getAvailableBooks)
// router.get("/Book/:id",validateOnGetBook,validateMW,controller.getOneBook)

router.route("/BookOperation")
       .get(controller.getAll)
       
router.route("/BookOperation/readingBYdate/get")
      .get(controller.readingBYdate)

router.route("/BookOperation")
     .get(controller.getAll)

router.route("/BookOperation/borrowBYdate/get")
     .get(controller.borrowBYdate)
   
router.route("/BookOperation/:_id")
    .delete(controller.deleteBookOperation)
    .get(controller.getBookOperation)


router.route("/Employees/addBorrowedBooks/:_id")
       .post(controller.addBorrowbook,validateMW, BookOperationValidation.validatePost)

router.route("/Employees/returnBorrowBook/:_id")
       .put(controller.returnBorrowBook ,validateMW, BookOperationValidation.validatePut)

router.route("/Employees/returnReadBook/:_id")
       .put(controller.returnReadBook ,validateMW, BookOperationValidation.validatePut)

router.route("/Employees/addReadBooks/:_id")
        .post(controller.addReadbook ,validateMW, BookOperationValidation.validatePost)

router.route("/member/borrowInfo/:_id")
       .get(controller.borrowInfo)

       router.route("/makeSureOfReturnedRead")
       .put(controller.makeSureOfReturnedRead)

       // router.route("/member/currentBorrowedBooks/:_id")
       // .get(controller.currentBorrowedBooks)

router.route("/BookOperation")
        .post(controller.addBorrowbook)
// router.route("/available")
//         .get(controller.available)
        
router.get("/Bookoper/mostBorrowedBooks",controller.mostBorrowedBooks)
router.get("/Bookoper/mostReadingBooks",controller.mostreadingBooks)

module.exports=router;
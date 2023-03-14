const express=require("express");
const router=express.Router();

const validateMW=require("../Core/Validation/validateMW");
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

router.route("/BookOperation/borrowBYdate/get")
     .get(controller.borrowBYdate)
   
   
router.route("/BookOperation/:_id")
    .patch(controller.updateBookOperation)
    .delete(controller.deleteBookOperation)
    .get(controller.getBookOperation)




router.route("/Employees/addBorrowedBooks/:_id")
       .post(controller.addBorrowbook)

router.route("/Employees/returnBook/:_id")
       .put(controller.returnBook)

router.route("/Employees/addReadBooks/:_id")
        .post(controller.addReadbook)

// router.route("/available")
//         .get(controller.available)
        
module.exports=router;
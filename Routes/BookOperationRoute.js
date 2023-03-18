const express=require("express");
const router=express.Router();

const validateMW=require("../Core/Validation/validateMW");
const BookOperationValidation=require("../Core/Validation/BookOperationValidation");
const controller=require("../Controllers/BookOperationController.js");
const { checkBasicAdminAndEmp, checkBaAdminAndAdminAndEmp, checkBaAdminAndMemberAndEmp }=require("./../Core/auth/AuthenticateMW");

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
       .get(checkBasicAdminAndEmp,validateMW,controller.getAll)
       
router.route("/BookOperation/readingBYdate/get")
      .get(checkBaAdminAndMemberAndEmp,validateMW, controller.readingBYdate)

router.route("/BookOperation/borrowBYdate/get")
     .get(checkBaAdminAndMemberAndEmp,validateMW, controller.borrowBYdate)
   
router.route("/BookOperation/:_id")
    .delete(checkBasicAdminAndEmp, validateMW, controller.deleteBookOperation)
    .get(checkBasicAdminAndEmp, validateMW, controller.getBookOperation)

router.route("/Employees/addBorrowedBooks/:_id")
       .post(checkBasicAdminAndEmp,validateMW,controller.addBorrowbook, BookOperationValidation.validatePost)

router.route("/Employees/returnBorrowBook/:_id")
       .put(checkBasicAdminAndEmp, validateMW, controller.returnBorrowBook , BookOperationValidation.validatePut)

router.route("/Employees/returnReadBook/:_id")
       .put(checkBasicAdminAndEmp,validateMW,controller.returnReadBook , BookOperationValidation.validatePut)

router.route("/Employees/addReadBooks/:_id")
        .post(checkBasicAdminAndEmp,validateMW, controller.addReadbook ,BookOperationValidation.validatePost)

router.route("/Employees/borrowInfo/:_id")
       .get(controller.borrowInfo)


router.route("/makeSureOfReturnedRead")
       .put(checkBasicAdminAndEmp, validateMW,controller.makeSureOfReturnedRead)
        
router.get("/Bookoper/mostBorrowedBooks",checkBaAdminAndMemberAndEmp, validateMW, controller.mostBorrowedBooks)
router.get("/Bookoper/mostReadingBooks",checkBaAdminAndMemberAndEmp, validateMW, controller.mostreadingBooks)

module.exports=router;
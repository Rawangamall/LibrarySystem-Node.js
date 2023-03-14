const express=require("express");
const router=express.Router();

const validateMW=require("../Core/Validation/validateMW");
const Operationcontroller=require("./../Controllers/BookOperationController.js");

// const router=express.Router();
// const validatePostBook=require("../Core/Validation/BookValidation").validatePost;
// const validatePutBook=require("../Core/Validation/BookValidation").validatePut;
// const validateOnGetBook=require("../Core/Validation/BookValidation").validateOnGet;
// const validateOnDeleteBook=require("../Core/Validation/BookValidation").validateOnDelete;
//const { checkAdmin, checkTeacherAndAdmin }=require("./../Core/auth/authenticationMW");

router.route("/BookOperation")
    .get(Operationcontroller.getOperations)
    .post(Operationcontroller.addOperation)
//     .put(validatePutBook,validateMW,controller.updateBook)
//     .delete(validateOnDeleteBook,validateMW,controller.deleteBook)

// router.get("/Book/available",controller.getAvailableBooks)
// router.get("/Book/:id",validateOnGetBook,validateMW,controller.getOneBook)


router.route("/BookOperation/readingBYdate/get")
       .get(Operationcontroller.readingBYdate)

router.route("/BookOperation/borrowBYdate/get")
      .get(Operationcontroller.borrowBYdate)

module.exports=router;
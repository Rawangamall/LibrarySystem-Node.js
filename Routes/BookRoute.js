const express=require("express");
const router=express.Router();

const validateMW=require("../Core/Validation/validateMW");
const controller=require("../Controllers/BookController.js");
const controller2=require("../Controllers/BookOperationController");
const validatePostBook=require("../Core/Validation/BookValidation").validatePost;
const validatePutBook=require("../Core/Validation/BookValidation").validatePut;
const validateOnIDParams=require("../Core/Validation/BookValidation").validateOnIDParams;

router.route("/Book")
    .get(controller.getBooks)
    .post(validateMW,controller.addBook)              //make it validatePostMember  controller.addMember
    .put(validatePutBook,validateMW,controller.updateBook)
    .delete(validateOnIDParams,validateMW,controller.deleteBook)

router.get("/Book/available",controller.getAvailableBooks)

router.get("/Book/:id",validateOnIDParams,validateMW,controller.getOneBook)
router.route("/member/NewArrivedBooks/get")
       .get(controller.getNewArrivedBooks)

router.route("/Book/filterBooks/get")
      .get(controller.filteredbooks)

router.route("/searchForBook")
      .get(controller.searchForBook)

module.exports=router;
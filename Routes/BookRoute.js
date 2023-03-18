const express=require("express");
const router=express.Router();

const validateMW=require("../Core/Validation/validateMW");
const controller=require("../Controllers/BookController.js");
const controller2=require("../Controllers/BookOperationController");
const validatePostBook=require("../Core/Validation/BookValidation").validatePost;
const validatePutBook=require("../Core/Validation/BookValidation").validatePut;
const validateOnGetBook=require("../Core/Validation/BookValidation").validateOnGet;
const validateOnDeleteBook=require("../Core/Validation/BookValidation").validateOnDelete;

const { checkBasicAdminAndAdmin }=require("./../Core/auth/AuthenticateMW");

router.route("/Book")
    .get(controller.getBooks) //checkBasicAdminAndAdminAndEmpAndMember
    .post(checkBasicAdminAndAdmin,validateMW,controller.addBook)              //make it validatePostMember  controller.addMember
    .put(checkBasicAdminAndAdmin,validatePutBook,validateMW,controller.updateBook)
    .delete(checkBasicAdminAndAdmin,validateOnDeleteBook,validateMW,controller.deleteBook)

router.get("/Book/available",controller.getAvailableBooks)  //checkBasicAdminAndAdminAndEmpAndMember

router.get("/Book/:id",validateOnGetBook,validateMW,controller.getOneBook) //checkBasicAdminAndAdminAndEmpAndMember

router.route("/member/NewArrivedBooks/get")   //checkBasicAdminAndAdminAndEmpAndMember
       .get(controller.getNewArrivedBooks)  

router.route("/Book/filterBooks/get")  //checkBasicAdminAndAdminAndEmpAndMember
      .get(controller.filteredbooks)

module.exports=router;
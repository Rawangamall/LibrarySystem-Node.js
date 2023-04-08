const express=require("express");
const router=express.Router();
const validateMW=require("../Core/Validation/validateMW");
const controller=require("../Controllers/BookController.js");
const validatePostBook=require("../Core/Validation/BookValidation").validatePost;
const validatePutBook=require("../Core/Validation/BookValidation").validatePut;
const validateOnIDParams=require("../Core/Validation/BookValidation").validateOnIDParams;

const { checkBasicAdminAndAdmin }=require("./../Core/auth/AuthenticateMW");

router.route("/Book")
    .get(controller.getBooks);

router.route("/Book/newArrivedBooks")
    .get(controller.getNewArrivedBooks)  

router.route("/Book/add")
      .post(controller.addBook) //validatePostBook,validateMW,checkBasicAdminAndAdmin

router.route("/searchForBook")
      .get(controller.searchForBook)

router.get("/Book/:id",validateOnIDParams,validateMW,controller.getOneBook)
router.delete("/Book/:id",validateOnIDParams,validateMW,controller.deleteBook) //checkBasicAdminAndAdmin

router.route("/Book/update/:id")
      .put(controller.updateBook) //checkBasicAdminAndAdmin,validatePutBook,validateMW

router.get("/Book/available",controller.getAvailableBooks)

router.route("/Book/filterBooks/get")
      .get(controller.filteredbooks)

module.exports=router;
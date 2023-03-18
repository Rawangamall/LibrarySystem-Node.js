const express=require("express");
const router=express.Router();
const validateMW=require("../Core/Validation/validateMW");
const controller=require("../Controllers/BookController.js");
const validatePostBook=require("../Core/Validation/BookValidation").validatePost;
const validatePutBook=require("../Core/Validation/BookValidation").validatePut;
const validateOnIDParams=require("../Core/Validation/BookValidation").validateOnIDParams;

const { checkBasicAdminAndAdmin }=require("./../Core/auth/AuthenticateMW");

router.route("/Book")
    .get(controller.getBooks)
    .post(checkBasicAdminAndAdmin,validatePostBook,validateMW,controller.addBook)

router.get("/Book/:id",validateOnIDParams,validateMW,controller.getOneBook)
router.delete("/Book/:id",checkBasicAdminAndAdmin,validateOnIDParams,validateMW,controller.deleteBook)
router.put("/Book/:id",checkBasicAdminAndAdmin,validatePutBook,validateMW,controller.updateBook)

router.route("/searchForBook")
      .get(controller.searchForBook)

router.get("/Book/available",controller.getAvailableBooks)
router.route("/member/NewArrivedBooks/get")
       .get(controller.getNewArrivedBooks)  

router.route("/Book/filterBooks/get")
      .get(controller.filteredbooks)

module.exports=router;
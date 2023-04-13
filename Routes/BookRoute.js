const express=require("express");
const router=express.Router();
const validateMW=require("../Core/Validation/validateMW");
const controller=require("../Controllers/BookController.js");
const validatePostBook=require("../Core/Validation/BookValidation").validatePost;
const validatePutBook=require("../Core/Validation/BookValidation").validatePut;
const validateOnIDParams=require("../Core/Validation/BookValidation").validateOnIDParams;
const imageValidate=require("../Core/Validation/imageValidate").addIMG;
const imageValidateUP=require("../Core/Validation/imageValidate").updateIMG;
const removeBookIMG=require("../Core/Validation/imageValidate").removeBookIMG

const { checkBasicAdminAndAdmin }=require("./../Core/auth/AuthenticateMW");

router.route("/Book")
    .get(controller.getBooks);

router.route("/Book/newArrivedBooks")
    .get(controller.getNewArrivedBooks)  

router.route("/Book/add")
      .post(controller.addBook) //checkBasicAdminAndAdmin,imageValidate,validatePostBook,validateMW,controller.addBook
router.get("/Book/:id",controller.getOneBook) //validateOnIDParams,validateMW,
router.delete("/Book/:id",controller.deleteBook) //checkBasicAdminAndAdmin,validateOnIDParams,validateMW,removeBookIMG,
router.put("/Book/update/:id",checkBasicAdminAndAdmin,validateMW,controller.updateBook) //imageValidateUP,validatePutBook

router.route("/searchForBook")
      .get(controller.searchForBook)

router.get("/Book/available",controller.getAvailableBooks)

router.route("/Book/filterBooks/get")
      .get(controller.filteredbooks)

module.exports=router;
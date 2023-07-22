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
    .get(validateMW,controller.getBooks);

router.route("/Book/newArrivedBooks")
    .get(validateMW,controller.getNewArrivedBooks)  

router.route("/Book/add")
      .post(checkBasicAdminAndAdmin,imageValidate,validatePostBook,validateMW,controller.addBook) 
router.get("/Book/:id",validateOnIDParams,validateMW,controller.getOneBook) 
router.delete("/Book/:id",checkBasicAdminAndAdmin,validateOnIDParams,validateMW,controller.deleteBook,removeBookIMG) 
router.put("/Book/update/:id",checkBasicAdminAndAdmin,validateMW,imageValidateUP,validatePutBook,controller.updateBook) 

router.route("/Book/search")
      .post(validateMW,controller.searchForBook)

router.get("/Book/available",validateMW,controller.getAvailableBooks)

router.route("/Book/filterBooks/get")
      .get(validateMW,controller.filteredbooks)

module.exports=router;
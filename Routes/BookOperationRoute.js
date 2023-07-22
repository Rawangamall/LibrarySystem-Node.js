const express=require("express");
const router=express.Router();

const validateMW=require("../Core/Validation/validateMW");
const BookOperationValidation=require("../Core/Validation/BookOperationValidation");
const controller=require("../Controllers/BookOperationController.js");
const { checkBasicAdminAndEmp, checkBaAdminAndAdminAndEmp, checkBaAdminAndMemberAndEmp }=require("./../Core/auth/AuthenticateMW");


router.route("/BookOperation")
       .get(checkBasicAdminAndEmp,validateMW,controller.getAll) 
       
router.route("/BookOperation/readingBYdate/get")
      .get(checkBaAdminAndMemberAndEmp,validateMW, controller.readingBYdate)

router.route("/BookOperation/borrowBYdate/get")
     .get(checkBaAdminAndMemberAndEmp,validateMW, controller.borrowBYdate)
   
router.route("/BookOperation/:_id")
    .delete(checkBasicAdminAndEmp, validateMW, controller.deleteBookOperation)
    .get(checkBasicAdminAndEmp, validateMW, controller.getBookOperation) 

router.route("/Book/borrow/:_id")
       .post(checkBasicAdminAndEmp,validateMW,BookOperationValidation.validatePost,controller.addBorrowbook) 

router.route("/Employees/returnBorrowBook/:_id")
       .put(checkBasicAdminAndEmp, validateMW, BookOperationValidation.validatePut, controller.returnBorrowBook )

router.route("/Employees/returnReadBook/:_id")
       .put(checkBasicAdminAndEmp,validateMW, BookOperationValidation.validatePut,controller.returnReadBook)

router.route("/Book/read/:_id")
        .post(checkBasicAdminAndEmp,validateMW,BookOperationValidation.validatePost,controller.addReadbook ) 

router.route("/Employees/borrowInfo")
       .get(controller.borrowInfo)


router.route("/makeSureOfReturnedRead")
       .put(checkBasicAdminAndEmp, validateMW,controller.makeSureOfReturnedRead)
        
router.get("/Bookoper/mostBorrowedBooks",checkBaAdminAndMemberAndEmp, validateMW,controller.mostBorrowedBooks) 
router.get("/Bookoper/mostReadingBooks",checkBaAdminAndMemberAndEmp, validateMW, controller.mostreadingBooks) 
router.get("/Bookoper/mostPopularBooks",checkBaAdminAndMemberAndEmp, validateMW,controller.mostPopularBooks)

module.exports=router;
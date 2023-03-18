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
    .delete(checkBasicAdminAndEmp, validateMW, controller.deleteBookOperation) //question delete it or only emp can delete
    .get(checkBasicAdminAndEmp, validateMW, controller.getBookOperation)

router.route("/Employees/addBorrowedBooks/:_id")
       .post(checkBasicAdminAndEmp,validateMW,controller.addBorrowbook, BookOperationValidation.validatePost)

router.route("/Employees/returnBorrowBook/:_id")
       .put(checkBasicAdminAndEmp, validateMW, controller.returnBorrowBook , BookOperationValidation.validatePut)

router.route("/Employees/returnReadBook/:_id")
       .put(checkBasicAdminAndEmp,validateMW,controller.returnReadBook , BookOperationValidation.validatePut)

router.route("/Employees/addReadBooks/:_id")
        .post(checkBasicAdminAndEmp,validateMW, controller.addReadbook ,BookOperationValidation.validatePost)

router.route("/member/borrowInfo/:_id") // basicadminand employee andmember
       .get(checkBaAdminAndMemberAndEmp,controller.borrowInfo)

router.route("/makeSureOfReturnedRead")
       .put(checkBasicAdminAndEmp, validateMW,controller.makeSureOfReturnedRead)
        
router.get("/Bookoper/mostBorrowedBooks",checkBaAdminAndMemberAndEmp, validateMW, controller.mostBorrowedBooks)
router.get("/Bookoper/mostReadingBooks",checkBaAdminAndMemberAndEmp, validateMW, controller.mostreadingBooks)

module.exports=router;
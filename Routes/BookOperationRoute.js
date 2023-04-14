const express=require("express");
const router=express.Router();

const validateMW=require("../Core/Validation/validateMW");
const BookOperationValidation=require("../Core/Validation/BookOperationValidation");
const controller=require("../Controllers/BookOperationController.js");
const { checkBasicAdminAndEmp, checkBaAdminAndAdminAndEmp, checkBaAdminAndMemberAndEmp }=require("./../Core/auth/AuthenticateMW");


router.route("/BookOperation")
       .get(controller.getAll) //checkBasicAdminAndEmp,validateMW,
       
router.route("/BookOperation/readingBYdate/get")
      .get(checkBaAdminAndMemberAndEmp,validateMW, controller.readingBYdate)

router.route("/BookOperation/borrowBYdate/get")
     .get(checkBaAdminAndMemberAndEmp,validateMW, controller.borrowBYdate)
   
router.route("/BookOperation/:_id")
    .delete(checkBasicAdminAndEmp, validateMW, controller.deleteBookOperation) //question delete it or only emp can delete
    .get(controller.getBookOperation) //checkBasicAdminAndEmp, validateMW, 

router.route("/Book/borrow/:_id")
       .post(controller.addBorrowbook) //checkBasicAdminAndEmp,validateMW, ,,,,,  BookOperationValidation.validatePost

router.route("/Employees/returnBorrowBook/:_id")
       .put(checkBasicAdminAndEmp, validateMW, controller.returnBorrowBook , BookOperationValidation.validatePut)

router.route("/Employees/returnReadBook/:_id")
       .put(checkBasicAdminAndEmp,validateMW,controller.returnReadBook , BookOperationValidation.validatePut)

router.route("/Book/read/:_id")
        .post(controller.addReadbook ) //checkBasicAdminAndEmp,validateMW,  ,,,,,,, ,BookOperationValidation.validatePost

// router.route("/member/borrowInfo/:_id") // basicadminand employee andmember
//        .get(checkBaAdminAndMemberAndEmp,controller.borrowInfo)

router.route("/Employees/borrowInfo")
       .get(controller.borrowInfo)


router.route("/makeSureOfReturnedRead")
       .put(checkBasicAdminAndEmp, validateMW,controller.makeSureOfReturnedRead)
        
router.get("/Bookoper/mostBorrowedBooks", controller.mostBorrowedBooks) //,checkBaAdminAndMemberAndEmp, validateMW
router.get("/Bookoper/mostReadingBooks", controller.mostreadingBooks) //,checkBaAdminAndMemberAndEmp, validateMW,
router.get("/Bookoper/mostPopularBooks",controller.mostPopularBooks) //checkBaAdminAndMemberAndEmp, validateMW,

module.exports=router;
const {body,param}=require("express-validator");

exports.memberArrayPOST =[
body("fullName").isString().withMessage("full name should string") ,
body("email").isEmail().withMessage("should be valid email form") ,
body("image").isString().withMessage("image should string") ,
body("phoneNumber").isNumeric().withMessage("The number should be integer"),
body("birthdate").matches(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/).withMessage("the date should be months/days/years"),
body("fullAddress").isString().withMessage("address should be string")
]
exports.memberArrayPatch =[
    param("_id").isInt().withMessage("should be object type"),
    body("fullName").isString().withMessage("full name should string") ,
    body("email").isEmail().withMessage("should be valid email form") ,
    body("password").isStrongPassword().withMessage("should be strong password of min 8 length"),
    body("image").isString().withMessage("image should string") ,
    body("phoneNumber").isInt().withMessage("The number should be integer"),
    body("birthdate").matches(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/).withMessage("the date should be months/days/years"),
    body("fullAddress").isString().withMessage("address should be string")
]
exports.MemberfirstLogin =[
    body("password").isStrongPassword().withMessage("should be strong password of min 8 length,uppercase,lowercse,char"),
    body("image").isString().withMessage("image should be found") ,
]
exports.memberArrayDel =[
    param("_id").isInt()
]
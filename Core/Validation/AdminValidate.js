const express=require("express");
const {body,param,query}=require("express-validator");

//validate on post
exports.validateAdminPost=[
                         body("firstName").isString().withMessage("Admin first-name should be string"),
                         body("lastName").isString().withMessage("Admin last-name should be string"),
                         body("password").isStrongPassword().withMessage("your password is weak"),
                         body("email").isEmail().withMessage("invalid email format"),
                         body("birthdate").isDate().withMessage("birthdate must follow date format"),
                         body("hireDate").isDate().withMessage("hiredate must follow date format"),
                         body("salary").isInt().withMessage("Admin Salary should be Integer id"),
                         body("Role").isIn(['Admin','BasicAdmin']).withMessage("role should be Admin or BasicAdmin"),
                         //body("image").optional().isString().withMessage("image should be string")
            ];
//validate on put
exports.validateAdminPut=[param("_id").isInt().withMessage("Admin Id should be Integer id"),
                          body("firstName").optional().isString().withMessage("Admin first-name should be string"),
                          body("lastName").optional().isString().withMessage("Admin last-name should be string"),
                          body("password").optional().isStrongPassword().withMessage("your password is weak"),
                          body("email").isEmpty().withMessage("It's not allowed to update email"),
                          body("birthdate").isEmpty().withMessage("It's not allowed to update birthdate"),
                          body("hireDate").isEmpty().withMessage("It's not allowed to update hiredate"),
                          body("salary").optional().isInt().withMessage("Admin Salary should be Integer id"),
                          body("Role").optional().isIn(['Admin','BasicAdmin']).withMessage("role should be Admin or BasicAdmin"),
                          //body("image").optional().isString().withMessage("image should be string")
];

//First Login Update
exports.adminFirstLogin =[
    param("_id").isNumeric().withMessage("ID must be integer"),
    body("password").isStrongPassword().withMessage("should be strong password of min 8 length,uppercase,lowercse,char"),
    body("image").isString().withMessage("image is not found") ,
]

//validate on delete&Get
exports.validateIDParams=[param("_id").isInt().withMessage("Admin Id should be object id")
];
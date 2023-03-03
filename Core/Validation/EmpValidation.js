const {body,param,query}=require("express-validator");

//Post validation
exports.validatePost=[
    body("id").isNumeric().withMessage("Employee's id must be number"),
    body("firstName").isAlpha().withMessage("Employee's firstName must be string"),
    body("lastName").isAlpha().withMessage("Employee's lastName must be string"),
    body("email").isEmail().withMessage("Employee's email must be in email format"),
    body("password").isAlphanumeric().withMessage("Employee's password must be string or integer or both"),
    body("birthdate").isDate().withMessage("Employee's birthdate must be date"),
    body("hireDate").isDate().withMessage("Employee's hireDate must be date"),
    body("image").isString().withMessage("Employee's image must be string"),
    body("salary").isNumeric().withMessage("Employee's salary must be string and integer"),
]

//Put validation
exports.validatePut=[
    body("id").isNumeric().optional().withMessage("Employee's id must be number"),
    body("firstName").isAlpha().optional().withMessage("Employee's firstName must be string"),
    body("lastName").isAlpha().optional().withMessage("Employee's lastName must be string"),
   // body("email").isEmail().withMessage("Employee's email must be in email format"),
    body("password").isAlphanumeric().optional().withMessage("Employee's password must be string or integer or both"),
    body("birthdate").isDate().optional().withMessage("Employee's birthdate must be date"),
   // body("hireDate").isDate().withMessage("Employee's hireDate must be date"),
    body("image").isString().optional().withMessage("Employee's image must be string"),
   // body("salary").isNumeric().withMessage("Employee's salary must be string and integer"),
]

//Delete validation
exports.validateOnDelete=[
    body("id").isNumeric().withMessage("ID must be integer")
] 

//Get validation
exports.validateOnGet=[
    param("id").isNumeric().withMessage("ID must be integer")
]
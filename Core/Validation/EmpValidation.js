const {body,param,query}=require("express-validator");

//Post validation
exports.validatePost=[
    body("firstName").isAlpha().withMessage("Employee's firstName must be string")
        .isLength({min:2,max:12}).withMessage("Employee's first name can't be > 12 or < 2 Letters"),
    body("lastName").isAlpha().withMessage("Employee's lastName must be string")
        .isLength({min:2,max:12}).withMessage("Employee's last name can't be > 12"),
    body("email").isEmail().withMessage("Employee's email must be in email format"),
    body("password").isAlphanumeric().withMessage("Employee's password must be string or integer or both")
        .isLength({min:6,max:20}).withMessage("Password can't be > 20 or < 6"),
    body("birthdate").isDate().withMessage("Employee's birthdate must be date"),
    body("hireDate").isDate().withMessage("Employee's hireDate must be date"),
    //body("image").isString().withMessage("Employee's image must be string"),
    body("salary").isNumeric().withMessage("Employee's salary must be number"),
]

//Put validation
exports.validatePut=[
    body("_id").isNumeric().optional().withMessage("Employee's id must be number"),
    body("firstName").isAlpha().optional().withMessage("Employee's firstName must be string")
        .isLength({min:2,max:12}).withMessage("Employee's first name can't be > 12 or < 2 Letters"),
    body("lastName").isAlpha().optional().withMessage("Employee's lastName must be string")
        .isLength({min:2,max:12}).withMessage("Employee's last name can't be > 12 or < 2 Letters"),
    body("email").isEmpty().withMessage("You Can't update email!"),
    body("password").isAlphanumeric().optional().withMessage("Employee's password must be string or integer or both")
        .isLength({min:6,max:20}).withMessage("Password can't be > 20 or < 6"),
    body("birthdate").isDate().optional().withMessage("Employee's birthdate must be date"),
    body("hireDate").isEmpty().withMessage("You Can't update hireDate!"),
    //body("image").isString().optional().withMessage("Employee's image must be string"),
    body("salary").isEmpty().withMessage("You Can't update salary!"),
]

//Delete validation
exports.validateOnDelete=[
    body("_id").isNumeric().withMessage("ID must be integer")
] 

//Get validation
exports.validateOnGet=[
    param("_id").isNumeric().withMessage("ID must be integer")
]
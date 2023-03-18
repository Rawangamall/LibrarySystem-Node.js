const {body,param}=require("express-validator");

exports.validatePost=[
    // body("operation").isIn(["borrow","read"]).withMessage("operation must be value of borrow,read"),
    body("memberID").isInt().withMessage("memberID must be integer"),
    param("bookID").isInt().withMessage("bookID must be integer"),
    body("employeeEmail").isInt().withMessage("employeeEmail must be in email format"),
    // body("startDate").isDate().withMessage("startDate must be in date format"),
    // body("expireDate").isDate().withMessage("expireDate must be in date format"),
    // body("returned").isBoolean().withMessage("returned must be true or false"),
    // body("late").isString().withMessage("late must be string"),
];
exports.validatePut=[
    param("_id").isInt().withMessage("bookID must be integer"),
    param("bookID").isInt().withMessage("bookID must be integer"),  
];

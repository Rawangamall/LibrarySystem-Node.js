const {body,param,query}=require("express-validator");

//Post validation
exports.validatePost=[
    body("title").isString().withMessage("Book's title must be string"),
    body("author").isString().withMessage("Book's author must be string"),
    body("publisher").isString().withMessage("Book's publisher must be string"),
    body("publishingDate").isDate().withMessage("Publishing date must be date"),
    body("category").isString().withMessage("Book's category must be string"),
    body("edition").isString().withMessage("Book's edition must be string"),
    body("pages").isNumeric().withMessage("Book's pages must be number"),
    body("noOfCopies").isNumeric().withMessage("Number of copies must be number"),
    //body("available").isBoolean().withMessage("Book's Availablility must be true or false"),
    body("shelfNo").isNumeric().withMessage("Shelf Number must be number")
]

//Put validation
exports.validatePut=[
    param("_id").isNumeric().withMessage("Book's id must be number"),
    body("title").isString().optional().withMessage("Book's title must be string"),
    body("author").isString().optional().withMessage("Book's author must be string"),
    body("publisher").isString().optional().withMessage("Book's publisher must be string"),
    body("publishingDate").isDate().optional().withMessage("Publishing date must be date"),
    body("category").isString().optional().withMessage("Book's category must be string"),
    body("edition").isString().optional().withMessage("Book's edition must be string"),
    body("pages").isNumeric().optional().withMessage("Book's pages must be number"),
    body("noOfCopies").isNumeric().optional().withMessage("Number of copies must be number"),
    //body("available").isBoolean().optional().withMessage("Book's Availablility must be true or false"),
    body("shelfNo").isNumeric().optional().withMessage("Shelf Number must be number")
]

//Delete&&Get validation
exports.validateOnIDParams=[
    param("id").isNumeric().withMessage("ID must be integer")
] 
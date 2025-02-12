const { body, validationResult } = require("express-validator")
const validate = {}

validate.validateInventory = () =>{
    return [
        body()
    ]
    
}
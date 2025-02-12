const { body } = require('express-validator');
const validate = {}

validate.classificationRules = () => {
  return [
   
    body("classification_name")
      .trim()
      .escape() 
      .notEmpty() 
      .withMessage("Classification name is required.")
      .matches(/^[a-zA-Z]+$/) 
      .withMessage("Classification name cannot contain spaces or special characters."),
  ];
};

module.exports = validate;
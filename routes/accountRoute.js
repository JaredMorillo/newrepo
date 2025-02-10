/*******************************
 * Account routes 
 * Unit 4, deliver login view activity
 ********************************/
//Need Resources 
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require("../utilities/account-validation")

/********************************
 * Deliver login view 
 * Unit 4, deliver login view activity
 ********************************/
router.get("/login", utilities.handleErrors(accountController.buildLogin))

/********************************
 * Deliver Registration view 
 * Unit 4, deliver registration view activity
 ********************************/
router.get("/register", utilities.handleErrors(accountController.buildRegister))

/********************************
 * Process Registration  
 * Unit 4, process registration activity
 ********************************/
router.post(
    "/register",
    regValidate.registrationRules(),
    regValidate.checkRegData,     
    utilities.handleErrors(accountController.registerAccount)
)

// Process the login attempt
router.post(
    "/login",
    (req, res) => {
      res.status(200).send('login process')
    }
  )

module.exports = router 
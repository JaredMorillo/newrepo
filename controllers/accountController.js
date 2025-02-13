/*************************
 * Account Controller
 * Unit 4, deliver login view activity
 *************************/
const utilities = require('../utilities')
const accountModel = require("../models/account-model");
const bcrypt = require("bcryptjs") 
const jwt = require("jsonwebtoken")
require("dotenv").config()

/***************************
 * Process Registration
 * Unit 4, process registration Activity
 ***************************/

async function registerAccount(req, res) {  
    let nav = await utilities.getNav()
    const {
        account_firstname,
        account_lastname,
        account_email,
        account_password,
    } = req.body
    
    //Hash the password before storing 
    let hashedPassword
    try { 
        // regular password and cost (salt is generated automatically)
        hashedPassword = await bcrypt.hashSync(account_password, 10)
    }   catch (error) {
        req.flash (
            "notice",
            "Sorry, there was an error processing the registration."
        )
        res.status(500).render("account/register", {
            title: "Registration",
            nav,
        })
    }

    const regResult = await accountModel.registerAccount(
        account_firstname,
        account_lastname,
        account_email,
        account_password,
        hashedPassword
    )
    
    if (regResult) {
        req.flash(
            "notice",
            `Congratulations, you\'re registered ${account_firstname}. Please log in.`
        )
        res.status(201).render("account/login", {
            title:"Login",
            nav,    
        })
    } else {
        req.flash("notice", "Sorry, the registration failed.")
        res.status(501).render("account/register", {
            title:"Registration",
            nav,
            errors: null, 
        })
    }
}

/*************************
 * Deliver login view
 * Unit 4, deliver login view activity
 *************************/
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
        title: "Login",
        nav,
    })
}

/*************************
 * Deliver Registration view
 * Unit 4, deliver register view activity
 *************************/
async function buildRegister(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/register", {
        title: "Register",
        nav,
        errors: null,
    })
}
/***************************
 * Process login request
 * Unit 5, Login Process Activity
 ***************************/

async function accountLogin(req, res) {
    let nav = await utilities.getNav()
    const { account_email, account_password } = req.body
    const accountData = await accountModel.getAccountByEmail(account_email)
    if (!accountData) {
        req.flash("notice", "Please check your credentials and try again.")
        res.status(400).render("account/login", {
            title: "Login",
            nav,
            errors: null,
            account_email,
        })
        return
    }
    try {
        if (await bcrypt.compare (account_password, accountData.account_password))
        {
            delete accountData.account_password
            const accessToken = jwt.sign(accountData, process.env.
            ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 100})
            res.cookie("jwt", accessToken, {httpOnly: true, maxAge: 3600 * 100})
            return res.redirect("/account/")
        } 
    } catch (error){
        return new Error('Access Forbidden')
    }
}

module.exports = {buildLogin, buildRegister, registerAccount} 
const invModel = require("../models/inventory-model")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '<hr />'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

/*************************************
 * Build a function for the vehicle***
 *************************************/
Util.buildVehicleHTML = async function(vehicle) {
  let content
  if (vehicle.length > 0) {
    const vehicleTitle = `${vehicle[0].inv_make} ${vehicle[0].inv_model}`;
    content = '<div class="individual-vehicle-container">'
    content += '<div class="image-container"><img src="' + vehicle[0].inv_thumbnail
    + '" alt="Image of ' + vehicleTitle
    + ' on CSE Motors" /></div>';
    content += '<div class="information-container">';
    content += '<p class="title">' + vehicleTitle + '</p>';
    content += '<p>' + 'Price: $' + '<span class="price">' + vehicle[0].inv_price + '</span>' + '</p>';
    content += '<p>' + 'Description: ' + '<span class="description">' + vehicle[0].inv_description + '</span>' + '</p>';
    content += '<p>' + 'Color: ' + '<span class="color">' + vehicle[0].inv_color + '</span>' + '</p>';
    content += '<p>' + 'Miles: ' + '<span class="miles">' + vehicle[0].inv_miles + '</span>' + '</p>';
    content += '</div>'
    content += '</div>';
  } else {
    content = '<p class="notice">Sorry, no details could be found.</p>';
  }
  return content;
}

Util.buildClassificationList =  async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
  '<select name ="classification_id" id="classificationList" required>'
  classificationList += "<option value= ' '>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value= "' + row.classification_id + '"'
    if(
      classification_id != null &&
      row.classification_id  == classification_id  
    ) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}

/*******************************
 * Middleware to check token validity
 * Unit 5, Login Process activity
 *******************************/
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
    jwt.verify(
      req.cookies.jwt,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, accountData){
        if (err) {
          req.flash("notice", "Please log in")
          res.clearCookie("jwt")
          return res.redirect("/account/login")
        }
      res.locals.accountData = accountData
      res.locals.loggedin = 1
      next()
      })
  } else {
    next()
  }
}

/*********************************
 * Check Login
 * Unit 5, jwt authorize activity
 *********************************/
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else{
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
}


module.exports = Util
const invModel = require("../models/inventory-model")
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

module.exports = Util
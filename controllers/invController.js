const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

invCont.getVehicleDetail = async function (req, res, next) {
  const inv_id = req.params.inv_id;
  const vehicleData = await invModel.getVehicleById(inv_id);
  const vehicleHTML = await utilities.buildVehicleHTML(vehicleData);
  let nav = await utilities.getNav();
  const make = vehicleData[0].inv_make;
  const model= vehicleData[0].inv_model;

  res.render("./inventory/details", {
    title: `${make} ${model}`,
    nav,
    vehicleHTML,
   });
}

module.exports = invCont
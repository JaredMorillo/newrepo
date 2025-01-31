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

invCont.getVehicleDetail = async function (req, res) {
  const inv_id = req.params.inv_id;
  const vehicleData = await invModel.getVehicleById(inv_id);
  
  if (!vehicleData) {
    return res.status(404).render("errors/error", { message: "Vehicle not found" });
  }

  const vehicleHTML = utilities.buildVehicleHTML(vehicleData);
  let nav = await utilities.getNav();
  res.render("inventory/details", {
    title: "Test Title",
    nav,
    vehicleHTML
   });
}

module.exports = invCont
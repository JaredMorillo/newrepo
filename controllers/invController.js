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

invCont.buildManagementView = async function(req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Vehicle Management",
    nav,
  })
}

invCont.addClassificationView = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  })
}

invCont.addNewClassification = async function(req, res, next) {
  let nav = await utilities.getNav();
  const { classification_name } = req.body;
  const registerClassification = await invModel.registerClassification(classification_name);
  if(registerClassification) {
    let nav = await utilities.getNav();
    req.flash(
      "notice",
      "The new classification was successfully added."
    );

    res.status(201).render("", {
      title: "Vehicle Management", 
      nav,
    });

  } else {
    req.flash("notice", "Sorry, the registration failed.");
    res.status(501).render("./inventory/add-classification", {
      title: "Add New Classification",
      nav,
    });
  }

}
 

invCont.addInventoryView = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-inventory", {
    title: "Add New Inventory",
    nav,
    errors: null,
  })
}

invCont.addNewInventory = async (req, res, next) => {
  const { inv_make, inv_model, inv_description, inv_price, inv_year, 
    inv_miles, inv_color, classification_id, inv_image, inv_thumbnail } = req.body;

  try {
      await inventoryModel.addVehicle({
          inv_make,
          inv_model,
          inv_description,
          inv_price,
          inv_year,
          inv_miles,
          inv_color,
          classification_id,
          inv_image,
          inv_thumbnail,
          nav,
      });
      req.flash('message', 'Vehicle added successfully!');
      res.redirect('/inv');
  } catch (error) {
      req.flash('errors', 'Register vehicle failed.');
      res.redirect('/inventory/add-inventory');
  }
};


module.exports = invCont    
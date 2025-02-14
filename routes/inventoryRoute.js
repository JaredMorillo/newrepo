const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities");
const inventoryValidation = require("../utilities/inventory-validation");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

router.get("/detail/:inv_id", invController.getVehicleDetail);

router.get("/", invController.buildManagementView);

router.get("/add-classification", invController.addClassificationView);

router.get("/add-inventory", invController.addInventoryView);

router.post(
  "/add-classification",
  inventoryValidation.classificationRule(),
  inventoryValidation.checkClassificationData,
  utilities.handleErrors(invController.addNewClassification)
);

router.post(
  "/add-inventory",
  inventoryValidation.newInventoryRules(),
  inventoryValidation.checkInventoryData,
  utilities.handleErrors(invController.addNewInventory)
);

/*****************************
 * Deliver the delete confirmation view
 * Unit 5, Delete Activity
 *****************************/
router.get(
  "/delete/:inv_id",
  utilities.handleErrors(invController.deleteView)
)

/*******************************
 * Process the delete inventory request
 * Unit 5, Delete Activity
 *******************************/
router.post("/delete",
  utilities.handleErrors(invController.deleteItem)
)


module.exports = router;
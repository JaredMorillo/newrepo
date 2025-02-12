// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const { validateInventory } = require('../views/middleware/validationMiddleware'); 


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

router.get("/detail/:inv_id", invController.getVehicleDetail);

router.get("/", invController.buildManagementView);

router.get("/add-classification", invController.addClassificationView);

router.get("/add-inventory", invController.addInventoryView);

router.post("/add-classification", utilities.handleErrors(invController.addNewClassification));

router.post("/add-inventory", utilities.handleErrors(invController.addNewInventory));

router.get('/add-inventory', async (req, res) => {
    const classificationList = await Util.buildClassificationList();
    res.render('inventory/add-inventory', { 
        flashMessage: req.flash('message'), 
        errors: req.flash('errors'),
        classificationList: classificationList,
        inv_make: '',
        inv_model: '',
        inv_description: '',
        inv_price: '',
        inv_year: '',
        inv_miles: '',
        inv_color: ''
    });
});

router.post('/add-inventory', validateInventory, invController.addNewInventory);


module.exports = router;
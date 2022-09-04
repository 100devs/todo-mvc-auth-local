const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companies");
const { ensureAuth } = require("../middleware/auth");

// @desc    Show add page
// @route   GET /companies/add
router.get("/add", ensureAuth, companyController.showAddPage);

// @desc    Process add form
// @route   POST /companies
router.post("/addCompany", ensureAuth, companyController.createCompany);

// @desc    Show all companies
// @route   GET /companies
router.get("/", ensureAuth, companyController.showCompanies);

// @desc    Show edit page
// @route   GET /companies/edit/:id
router.get("/edit/:id", ensureAuth, companyController.editCompany);

// @desc    Update company
// @route   PUT /companies/:id
router.put("/:id", ensureAuth, companyController.updateCompany);

// @desc    Delete company
// @route   DELETE /companies/:id
router.delete("/:id", ensureAuth, companyController.deleteCompany);


module.exports = router;

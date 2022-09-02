const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companies");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, companyController.getCompanies);

router.post("/createCompany", companyController.createCompany);
router.put("/editCompany", companyController.editCompany);

router.delete("/deleteCompany", companyController.deleteCompany);

module.exports = router;

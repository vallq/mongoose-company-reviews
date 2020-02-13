const express = require("express");
const router = express.Router();
const Company = require("../models/company.model.js");

//1: GET "/companies" to retrieve all companies from db
router.get("/", async (req, res) => {
  const includesAll = new RegExp(/./);
  const companies = await Company.find(
    { id: includesAll },
    "id companyName companySuffix numberOfEmployees description"
  );
  res.status(200).send(companies);
});

//2: GET "/companies/:id" to retrieve target company data with reviews
router.get("/:id", async (req, res) => {
  const targetCompanyId = req.params.id;
  const company = await Company.findOne({ id: targetCompanyId });
  res.status(200).send(company);
});

module.exports = router;

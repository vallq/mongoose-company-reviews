const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true },
  title: { type: String, required: true },
  review: { type: String, required: true }
});

const companySchema = new Schema({
  id: { type: String, required: true },
  companyName: { type: String, required: true },
  companySuffix: { type: String, required: true },
  numberOfEmployees: { type: Number, required: true },
  description: { type: String, required: true },
  reviews: [reviewsSchema]
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 100,
    index: true,
    trim: true,
  },
  viewValue: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 100,
    trim: true,
  },
  description: {
    type: String,
    minlength: 0,
    maxlength: 500,
    trim: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);

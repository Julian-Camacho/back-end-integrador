const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    index: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
    max: 10000000,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: "Category",
  },
  description: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 500,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Number,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);

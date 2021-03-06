const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  estimatedValue: {
    type: Number,
    required: true,
  },
  collectionId: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;

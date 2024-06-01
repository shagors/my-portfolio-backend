const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Item", itemSchema);

const mongoose = require("mongoose");

const managerSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  nationality: {
    type: String,
  },
});

const Manager = mongoose.model("Manager", managerSchema);

module.exports = { Manager, managerSchema };

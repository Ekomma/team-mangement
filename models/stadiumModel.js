const mongoose = require("mongoose");

const stadiumSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
  },
  team: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
});

const Stadium = mongoose.model("Stadium", stadiumSchema);

module.exports = { Stadium, stadiumSchema };

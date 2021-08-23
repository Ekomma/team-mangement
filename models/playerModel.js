const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    default: null,
  },
  position: {
    type: String,
    enum: ["defense", "midfield", "attack"],
  },
  shirt: {
    type: Number,
  },
  isCaptain: {
    type: Boolean,
    default: false,
  },
  isViceCaptain: {
    type: Boolean,
    default: false,
  },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = { Player, playerSchema };

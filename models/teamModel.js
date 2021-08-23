const mongoose = require("mongoose");
const { managerSchema } = require("../models/managerModel");
const { stadiumSchema } = require("../models/stadiumModel");
const { playerSchema } = require("../models/playerModel");

const teamSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    alias: { type: String, required: true, unique: true },
    managerDetails: managerSchema,
    stadiumDetails: stadiumSchema,
    teamDetails: {
      totalNumberOfPlayers: {
        type: Number,
        required: true,
      },
      captain: playerSchema,
      viceCaptain: playerSchema,
    },
    foundedDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
teamSchema.plugin(require("mongoose-autopopulate"));

teamSchema.post("save", async function (doc, next) {
  next();
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;

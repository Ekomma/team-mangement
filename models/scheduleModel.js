const mongoose = require("mongoose");

const scheduleSchema = mongoose.Schema({
  team: {
    type: String,
    required: true,
  },
  opponent: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["finished", "cancelled", "postponed", "ongoing", "pending"],
    required: true,
  },
  result: {
    type: String,
    enum: ["win", "lose", "draw", null],
    default: null,
  },
});

scheduleSchema.pre("save", async function (next) {
  if (this.status !== "finished" && this.result !== null) {
    return next(new Error("Cannot set result unless game is finished"));
  }
  next();
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;

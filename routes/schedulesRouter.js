const express = require("express");
const {
  createSchedule,
  getSchedules,
} = require("../controllers/schedulesController");
const createError = require("http-errors");

const router = express.Router();

router.post("/create", async function createASchedule(req, res, next) {
  let scheduleData = req.body;
  if (scheduleData.result) {
    throw new Error("Cannot set result before schedule, please omit result");
  }
  try {
    const schedule = await createSchedule(scheduleData);
    res.status(201).json(schedule);
  } catch (error) {
    next(createError(500, `An error ocurred: ${error.message}`));
  }
});

router.put("/update", async function createASchedule(req, res, next) {
  try {
    const schedule = await createSchedule(req.body);
    res.status(201).json(schedule);
  } catch (error) {
    next(createError(500, `An error ocurred: ${error.message}`));
  }
});

router.get("/", async function getAllSchedules(res, next) {
  try {
    const schedule = await getSchedules();
    res.json(schedule);
  } catch (error) {
    next(createError(500, `An error ocurred: ${error.message}`));
  }
});

module.exports = router;

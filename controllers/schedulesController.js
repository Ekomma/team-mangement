const Schedule = require("../models/scheduleModel");
const { findExistingSchedule, verifyfields } = require("../utils/helper");

const createSchedule = async (schedule) => {
  verifyfields(schedule);
  const { team, opponent, result } = schedule;
  const opponentSchedule = {
    ...schedule,
    team: opponent,
    opponent: team,
  };
  if (schedule.opponent === schedule.team) {
    throw new Error("Cannot play against self, opponent needs to be different");
  }
  try {
    const existingSchedule = await findExistingSchedule(schedule);
    const existingScheduleForOpponent = await findExistingSchedule(
      opponentSchedule
    );
    if (existingSchedule.length > 0) {
      if (
        existingSchedule[0].opponent === schedule.opponent &&
        existingSchedule[0].date === schedule.date &&
        existingSchedule[0].time === schedule.time &&
        !result
      ) {
        throw new Error("Schedule already exists");
      }
    }

    if (existingScheduleForOpponent.length > 0) {
      if (
        existingScheduleForOpponent[0].opponent === team &&
        existingScheduleForOpponent[0].date === schedule.date &&
        existingScheduleForOpponent[0].time === schedule.time &&
        !result
      ) {
        throw new Error("Schedule already exists");
      }
    }
    schedule.status = schedule.status.toLowerCase();

    schedule.result = schedule.result ? schedule.result.toLowerCase() : null;

    const createdSchedule = await Schedule.create(schedule);
    return createdSchedule;
  } catch (error) {
    throw new Error(`Failed to create Schedule: ${error.message}`);
  }
};

const getSchedules = async () => {
  try {
    const schedules = await Schedule.find();
    return schedules;
  } catch (error) {
    throw new Error(`Failed to create Schedule: ${error.message}`);
  }
};

module.exports = { createSchedule, getSchedules };

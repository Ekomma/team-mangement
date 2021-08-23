const { Manager } = require("../models/managerModel");
const { Stadium } = require("../models/stadiumModel");
const { Player } = require("../models/playerModel");
const Schedule = require("../models/scheduleModel");

const restructure = (teamData) => {
  const {
    managerDetails,
    stadiumDetails,
    teamDetails,
    ...remainingTeamDetails
  } = teamData;

  const { captainName, viceCaptainName } = teamDetails;
  const { name } = remainingTeamDetails;
  const newData = {
    ...remainingTeamDetails,
    managerDetails: {
      ...managerDetails,
      team: name,
    },
    stadiumDetails: {
      ...stadiumDetails,
      team: name,
    },
    teamDetails: {
      ...teamDetails,
      captain: {
        name: captainName,
        isCaptain: true,
        team: name,
      },
      viceCaptain: {
        name: viceCaptainName,
        isViceCaptain: true,
        team: name,
      },
    },
  };
  return newData;
};

const clearCreatedDataAfterFailure = async (createdData) => {
  await Manager.deleteOne({ _id: createdData.managerId });
  await Stadium.deleteOne({ _id: createdData.stadiumId });
  await Player.deleteOne({ _id: createdData.captainId });
  await Player.deleteOne({ _id: createdData.viceCaptainId });
};

const findExistingSchedule = async (schedule) => {
  const { team, opponent, date, time } = schedule;
  return await Schedule.find({
    team,
    opponent,
    date,
    time,
  });
};


const verifyfields = (schedule) => {
  if (!schedule.team) {
    throw new Error("Please include a team to create or update a schedule");
  } else if (!schedule.opponent) {
    throw new Error(
      "Please include an opponent to create or update a schedule"
    );
  } else if (!schedule.date) {
    throw new Error("Please include a date to create or update a schedule");
  } else if (!schedule.time) {
    throw new Error("Please include a time to create or update a schedule");
  } else if (!schedule.status) {
    throw new Error("Please include a status to create or update a schedule");
  }
};

module.exports = {
  restructure,
  clearCreatedDataAfterFailure,
  findExistingSchedule,
  verifyfields,
};

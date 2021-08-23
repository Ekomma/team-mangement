const { Manager } = require("../models/managerModel");
const { Stadium } = require("../models/stadiumModel");
const { Player } = require("../models/playerModel");
const Team = require("../models/teamModel");
const {
  restructure,
  clearCreatedDataAfterFailure,
} = require("../utils/helper");

const createTeam = async (body) => {
  const restructuredData = restructure(body);
  let createdData = {};
  try {
    const manager = await Manager.create(restructuredData.managerDetails);
    createdData.managerId = manager._id;
    const stadium = await Stadium.create(restructuredData.stadiumDetails);
    createdData.stadiumId = stadium._id;
    const captain = await Player.create(restructuredData.teamDetails.captain);
    createdData.captainId = captain._id;
    const viceCaptain = await Player.create(
      restructuredData.teamDetails.viceCaptain
    );
    createdData.viceCaptainId = viceCaptain._id;

    const createdTeam = await Team.create(restructuredData);
    return createdTeam;
  } catch (error) {
    await clearCreatedDataAfterFailure(createdData);
    throw new Error(`Failed to create Team: ${error.message}`);
  }
};

const getTeams = async () => {
  try {
    const createdTeam = await Team.find({});
    return createdTeam;
  } catch (error) {
    throw new Error(`Failed to get Teams: ${error.message}`);
  }
};

module.exports = {
  createTeam,
  getTeams,
};

const { Player } = require("../models/playerModel");
const Team = require("../models/teamModel");

const registerPlayer = async (playerDetails) => {
  if (playerDetails.position) {
    playerDetails.position = playerDetails.position.toLowerCase();
  }
  try {
    const { name } = playerDetails;
    let checkPlayer = await Player.findOne({ name });
    if (checkPlayer) {
      return await Player.findByIdAndUpdate(checkPlayer, playerDetails, {
        new: true,
        useFindAndModify: false,
      });
    } else {
      const player = await Player.create(playerDetails);
      return player;
    }
  } catch (error) {
    throw new Error(`Failed to register Player: ${error.message}`);
  }
};

const deregisterPlayer = async (playerId) => {
  try {
    const player = await Player.findById(playerId);
    if (!player) {
      throw new Error("Player doesn't exist, please create player");
    }
    return await Player.findByIdAndUpdate(
      playerId,
      {
        team: null,
        isCaptain: false,
        isViceCaptain: false,
      },
      { new: true, useFindAndModify: false }
    );
  } catch (error) {
    throw new Error(`Failed to deregister Player: ${error.message}`);
  }
};

const getPlayers = async (teamId) => {
  try {
    const team = await Team.findById(teamId);
    if (team) {
      const players = await Player.find({ team: team.name });
      return players;
    } else {
      throw new Error("Team not found");
    }
  } catch (error) {
    throw new Error(`Failed to get Player: ${error.message}`);
  }
};

module.exports = { getPlayers, registerPlayer, deregisterPlayer };

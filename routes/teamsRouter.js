const express = require("express");
const createError = require("http-errors");
const { createTeam, getTeams } = require("../controllers/teamsController");

const router = express.Router();

router.post("/", async function createATeam(req, res, next) {
  try {
    const createdTeam = await createTeam(req.body);
    res.status(201).json(createdTeam);
  } catch (error) {
    console.log(error);
    next(createError(500, `An error ocurred: ${error.message}`));
  }
});

router.get("/", async function getAllTeams(req, res) {
  try {
    const teams = await getTeams();
    res.json(teams);
  } catch (error) {
    next(createError(500, `An error ocurred: ${error.message}`));
  }
});

module.exports = router;

const express = require("express");
const createError = require("http-errors");
const {
  getPlayers,
  deregisterPlayer,
  registerPlayer,
} = require("../controllers/playersController");

const router = express.Router();

router.post("/register", async function registerAPlayer(req, res, next) {
  try {
    const player = await registerPlayer(req.body);
    res.status(201).json(player);
  } catch (error) {
    next(createError(500, `An error ocurred: ${error.message}`));
  }
});

router.put(
  "/deregister/:playerId",
  async function deregisterAPlayer(req, res, next) {
    try {
      const player = await deregisterPlayer(req.params.playerId);
      res.status(201).json(player);
    } catch (error) {
      next(createError(500, `An error ocurred: ${error.message}`));
    }
  }
);

router.get("/team/:teamId", async function getllAPlayers(req, res, next) {
  try {
    const players = await getPlayers(req.params.teamId);
    res.json(players);
  } catch (error) {
    next(createError(500, `An error ocurred: ${error.message}`));
  }
});

module.exports = router;

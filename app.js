const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const connectDB = require("./config/dbconnect")

const teamsRouter = require("./routes/teamsRouter");
const playersRouter = require("./routes/playersRouter");
const schedulesRouter = require("./routes/schedulesRouter");

const app = express();

connectDB();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/teams", teamsRouter);
app.use("/api/players", playersRouter);
app.use("/api/schedules", schedulesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;

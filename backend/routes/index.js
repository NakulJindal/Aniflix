const express = require("express");
const userRouter = require("./user");
const animeRouter = require("./anime");
const accountRouter = require("./account");

const Router = express.Router();

Router.use("/user", userRouter);
Router.use("/anime", animeRouter);
Router.use("/watchlist", accountRouter);

Router.get("/", (req, res) => {
  res.status(200).json({ message: "Connected and Running!!" });
});

module.exports = Router;

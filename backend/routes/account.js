const express = require("express");
const mongoose = require("mongoose");
const { Account } = require("../db");
const { authMiddleware } = require("../middlewares/middleware");

const accountRouter = express.Router();

accountRouter.get("/", function (req, res) {
  res.status(200).json({ message: "Connected successfully!!" });
});

accountRouter.get("/watchlist", authMiddleware, async function (req, res) {
  try {
    const account = await Account.findOne({ userId: req.userId });
    res.status(200).json({ watchList: account.watchList });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Could not Fetch Balance." });
  }
});

accountRouter.put("/add", authMiddleware, async function (req, res) {
  try {
    const { mal_id } = req.body;

    const updatedAccount = await Account.findOneAndUpdate(
      { userId: userId },
      { $addToSet: { watchList: mal_id } },
      { new: true, upsert: false }
    );

    if (!updatedAccount)
      return res.status(200).json({ message: "Account Not Found!!" }).end();

    res.status(200).json({
      message: "Added to Watch List!!",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Update Failed!!" });
  }
});

module.exports = accountRouter;

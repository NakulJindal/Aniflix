const express = require("express");
const { Account } = require("../db");
const { authMiddleware } = require("../middlewares/middleware");

const accountRouter = express.Router();

accountRouter.get("/", authMiddleware, async function (req, res) {
  try {
    const account = await Account.findOne({ userId: req.userId });
    res.status(200).json({ watchList: account.watchList });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Could not Fetch List." });
  }
});

accountRouter.post("/check", authMiddleware, async function (req, res) {
  try {
    const userId = req.userId;
    const mal_id = req.body.mal_id;

    const existingAccount = await Account.findOne({ userId });

    if (!existingAccount)
      return res
        .status(403)
        .json({ message: "Session Expired!! Please Login Again!!" })
        .end();

    for (let i = 0; i < existingAccount.watchList.length; i++) {
      if (existingAccount.watchList[i].mal_id === mal_id)
        return res.status(200).json({ check: true }).end();
    }

    return res.status(200).json({ check: false }).end();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Check Failed!!" });
  }
});

accountRouter.put("/remove", authMiddleware, async function (req, res) {
  try {
    const userId = req.userId;
    const mal_id = req.body.mal_id;

    const existingAccount = await Account.findOne({ userId });

    if (!existingAccount)
      return res
        .status(403)
        .json({ message: "Session Expired!! Please Login Again!!" })
        .end();

    existingAccount.watchList = existingAccount.watchList.filter(
      (item) => item.mal_id !== mal_id
    );

    await existingAccount.save();

    res.status(200).json({
      message: "Removed From Watch List!!",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Update Failed!!" });
  }
});

accountRouter.put("/add", authMiddleware, async function (req, res) {
  try {
    const userId = req.userId;
    const aniData = req.body;

    const updatedAccount = await Account.findOneAndUpdate(
      { userId },
      { $addToSet: { watchList: aniData } },
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

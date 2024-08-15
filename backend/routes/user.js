const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { User, Account } = require("../db");
const {
  userSignupValidate,
  userSigninValidate,
  updateInputValidate,
  authMiddleware,
} = require("../middlewares/middleware");
require("dotenv").config();

const userRouter = express.Router();

userRouter.get("/", function (req, res) {
  res.status(200).json({ message: "Connected successfully!!" });
});

userRouter.post("/signup", userSignupValidate, async function (req, res) {
  try {
    const existingUser = await User.findOne(req.body);

    if (existingUser)
      res.status(411).json({ message: "User already Exists!!" }).end();
    else {
      const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });

      const userid = newUser._id;

      const newAccount = await Account.create({
        watchList: [],
        userId: userid,
      });

      console.log(newUser);
      console.log(newAccount);

      const jwtToken = jwt.sign({ userid: userid }, JWT_SECRET);

      res.cookie("token", jwtToken, {
        expires: new Date(new Date().getTime() + 7 * 86400000),
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });

      return res
        .status(200)
        .json({ message: "User created successfully", token: jwtToken });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "User not created" });
  }
});

userRouter.post("/signin", userSigninValidate, async function (req, res) {
  try {
    const existingUser = await User.findOne(req.body);

    if (!existingUser) {
      res.status(411).json({
        message:
          "User Does not Exists!! Please Enter Correct Username/Password.",
      });
    } else {
      const jwtToken = jwt.sign({ userId: existingUser._id }, JWT_SECRET);

      res.cookie("token", jwtToken, {
        expires: new Date(new Date().getTime() + 7 * 86400000),
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });

      return res
        .status(200)
        .json({ message: "Signed In successfully!!", token: jwtToken });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "INVALID USER DETAILS!!" });
  }
});

userRouter.post("/signout", async function (req, res) {
  try {
    res.clearCookie("token", {
      expires: new Date(new Date().getTime() + 1 * 86400000),
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({ message: "Successfully signed out" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Already Signed Out!!" });
  }
});

userRouter.put(
  "/",
  authMiddleware,
  updateInputValidate,
  async function (req, res) {
    try {
      await User.findOneAndUpdate({ _id: req.userId }, req.body);
      res.status(200).json({ message: "User Details Updated successfully!!" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "User Details Updation Failed!!" });
    }
  }
);

// userRouter.get("/bulk", authMiddleware, async function (req, res) {
//   const filter = req.query.filter || "";
//   try {
//     // const firstnameResults = await User.find({ firstName: filter });
//     // const lastnameResults = await User.find({ lastName: filter });
//     // const finalResults = [...firstnameResults, ...lastnameResults];

//     const finalResults = await User.find({
//       $or: [
//         {
//           firstName: {
//             $regex: filter,
//           },
//         },
//         {
//           lastName: {
//             $regex: filter,
//           },
//         },
//       ],
//     });

//     res.status(200).json({
//       users: finalResults.map((user) => ({
//         username: user.username,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         _id: user._id,
//       })),
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: "Users Could not be Fetched!!" });
//   }
// });

module.exports = userRouter;

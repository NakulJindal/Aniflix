const zod = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

const signUpUser = zod.object({
  username: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string().min(6),
});

const signInUser = zod.object({
  username: zod.string(),
  password: zod.string().min(6),
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().min(6).optional(),
});

function authMiddleware(req, res, next) {
  const jwtToken = req.cookies.token;
  console.log(jwtToken);

  if (!jwtToken)
    res.status(403).json({ message: "INVALID TOKEN!! PLEASE SIGN IN." }).end();

  try {
    const decoded = jwt.verify(jwtToken, JWT_SECRET);
    req.userId = decoded.userid;
    next();
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "INVALID TOKEN!! PLEASE SIGN IN" }).end();
  }
}

async function userSignupValidate(req, res, next) {
  try {
    const { success } = signUpUser.safeParse(req.body);
    if (success) next();
    else res.status(411).json({ message: "INVALID INPUT!! TRY AGAIN" }).end();
  } catch (err) {
    console.log(err);
    res.sendStatus(400).end();
  }
}

async function userSigninValidate(req, res, next) {
  try {
    const { success } = signInUser.safeParse(req.body);
    if (success) next();
    else res.status(411).json({ message: "INVALID INPUT!! TRY AGAIN" }).end();
  } catch (err) {
    console.log(err);
    res.sendStatus(400).end();
  }
}

async function updateInputValidate(req, res, next) {
  try {
    const { success } = updateBody.safeParse(req.body);
    if (success) next();
    else res.status(411).json({ message: "INVALID INPUT!! TRY AGAIN" }).end();
  } catch (err) {
    console.log(err);
    res.sendStatus(400).end();
  }
}

module.exports = {
  userSignupValidate,
  userSigninValidate,
  updateInputValidate,
  authMiddleware,
};

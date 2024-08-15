const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const rootRouter = require("./routes/index");
require("dotenv").config();

const app = express();
const PORT = 3000;
//NJ_PAYTM

mongoose.connect(process.env.DB_URL);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/v1", rootRouter);

app.get("/", (req, res) => {
  res.redirect("/api/v1");
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});

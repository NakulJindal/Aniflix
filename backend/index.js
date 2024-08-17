const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const rootRouter = require("./routes/index");
require("dotenv").config();

const app = express();
const PORT = 3000;

mongoose.connect(process.env.DB_URL);

const allowedOrigins = [
  process.env.FRONT_END_URL,
  'https://aniflixproject.vercel.app',
  'https://anniflix.netlify.app'
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin, like mobile apps or curl requests
    if (!origin) return callback(null, true);

    // Check if the request's origin is in the allowed origins array
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
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

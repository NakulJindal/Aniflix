const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_URL);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  avatar: {
    type: String,
  },
});

const TrailerSchema = new mongoose.Schema({
  embed_url: { type: String, required: false },
  images: {
    image_url: { type: String, required: false },
    small_image_url: { type: String, required: false },
    medium_image_url: { type: String, required: false },
    large_image_url: { type: String, required: false },
    maximum_image_url: { type: String, required: false },
  },
  url: { type: String, required: false },
  youtube_id: { type: String, required: false },
});

const ImageFormatSchema = new mongoose.Schema({
  image_url: { type: String, required: true },
  small_image_url: { type: String, required: true },
  large_image_url: { type: String, required: true },
});

const ImageSchema = new mongoose.Schema({
  jpg: ImageFormatSchema,
  webp: ImageFormatSchema,
});

const BroadcastSchema = new mongoose.Schema({
  day: { type: String, required: false },
  string: { type: String, required: false },
  time: { type: String, required: false },
  timezone: { type: String, required: false },
});

const AnimeSchema = new mongoose.Schema({
  airing: { type: Boolean, required: true },
  broadcast: { type: BroadcastSchema, required: false },
  episodes: { type: Number, required: false },
  mal_id: { type: Number, required: true },
  title: { type: String, required: true },
  title_english: { type: String, required: true },
  title_japanese: { type: String, required: true },
  trailer: { type: TrailerSchema, required: false },
  images: { type: ImageSchema, required: true },
  type: { type: String, required: true },
  year: { type: Number, required: false },
});

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  watchList: {
    type: [AnimeSchema],
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", AccountSchema);

module.exports = { User, Account };

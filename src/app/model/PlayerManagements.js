const mongoose = require("mongoose")
const slug = require("mongoose-slug-generator")
mongoose.plugin(slug)
const Schema = mongoose.Schema

const PlayerManagament = new Schema({
  name: { type: String },
  account: { type: String },
  password: { type: String },
  image: { type: String },
  ath: { type: Number , default: 0},
  slug: { type: String, slug: "account", unique: true },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
})
module.exports = mongoose.model("PlayerManagaments", PlayerManagament);
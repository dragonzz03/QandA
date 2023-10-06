const mongoose = require("mongoose")
const slug = require("mongoose-slug-generator")
mongoose.plugin(slug)
const Schema = mongoose.Schema

const PlayerManagament = new Schema({
  name: { type: String },
  image: { type: String },
  totalPoint: { type: Number },
  ath: { type: Number },
  slug: { type: String, slug: "_id", unique: true },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
})
module.exports = mongoose.model("PlayerManagaments", PlayerManagament);
const mongoose = require("mongoose")
const slug = require("mongoose-slug-generator")
mongoose.plugin(slug)
const Schema = mongoose.Schema

const ListQuestion = new Schema({
  author: { type: String },
  question: { type: String },
  answer1: { type: String },
  answer2: { type: String },
  answer3: { type: String },
  answer4: { type: String },
  trueAnswer: { type: String },
  slug: { type: String, slug: "author", unique: true },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
})
module.exports = mongoose.model("ListQuestions", ListQuestion);

const mongoose = require("mongoose");

const TimelineSchema = new mongoose.Schema({
  userid: String,
  text: String,
  hits: Number,
  time: String
});  

module.exports = mongoose.model('Timeline', TimelineSchema);

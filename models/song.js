const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
    data: String,
    name: String,
    writer: String
});

module.exports = mongoose.model("song", songSchema);

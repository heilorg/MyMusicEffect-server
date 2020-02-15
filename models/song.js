const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
    path: String,
    title: String,
    owner: String
});

module.exports = mongoose.model("song", songSchema);

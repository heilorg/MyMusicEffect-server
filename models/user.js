const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Song = require("./models/song");

const userSchema = new Schema({
    id: String,
    password: String,
    name: String,
    songs: [Song]
});

module.exports = mongoose.model("user", userSchema);

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const api = require("./routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); // 객체 안 객체 허용
app.use(bodyParser.json());
app.use(
    session({
        secret: "!@#heilorg!@#",
        resave: false,
        saveUninitialized: true
    })
);
app.use("/api", api);

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
    console.log("Express server has started on port " + port);
});

const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => {
    console.log("Connected to mongod server");
});

mongoose.connect("mongodb://localhost/mongodb_tutorial");
// mongoose.connect('mongodb://username:password@host:port/database?options...');

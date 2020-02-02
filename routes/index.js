const express = require("express");
const user = require("./user");
const song = require("./song");

const router = express.Router();
router.use("/user", user);
router.use("/song", song);
router.get("/test", (req, res) => {
    res.json({ data: "hello express" });
});

module.exports = router;

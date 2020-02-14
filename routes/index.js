const express = require("express");
const user = require("./user");
const song = require("./song");

const router = express.Router();
router.use("/user", user);
router.use("/song", song);
router.get("/getInfo", (req, res) => {
    if (typeof req.session.user === "undefined")
        return res.status(401).json({ error: 0 });
    return res.json({ user: req.session.user });
});

module.exports = router;

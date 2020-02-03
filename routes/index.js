const express = require("express");
const user = require("./user");
const song = require("./song");

const router = express.Router();
router.use("/user", user);
router.use("/song", song);
router.get("/test", (req, res) => {
    res.json({ data: "hello express" });
});
router.get("/getInfo", (req, res) => {
    if (typeof req.session.user === "undefined")
        return res.status(401).json({ error: 1 });
    return res.json({ success: true });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/user");

// GET
router.get("/all", (req, res) => {
    User.find((err, users) => {
        if (err) throw err;
        res.json(users);
    });
});

// POST
router.post("/create", (req, res) => {
    let user = new User();
    user.id = req.body.id;
    user.password = req.body.password;
    user.name = req.body.name;

    let idRegex = /^[a-z0-9]+$/;
    if (!idRegex.test(user.id))
        return res.status(400).json({ error: "bad id", code: 1 });

    if (user.password.length < 4 || typeof user.password !== "string")
        return res.status(400).json({ error: "bad passwrod", code: 2 });

    let nameRegex = /^[a-zㄱ-ㅎㅏ-ㅣ가-힣]+$/;
    if (!nameRegex.test(user.name))
        return res.status(400).json({ error: "bad name", code: 3 });

    User.findOne({ id: user.id }, (err, findUser) => {
        if (err) throw err;
        if (findUser)
            return res.status(409).json({ error: "need other id", code: 4 });

        user.password = user.generateHash(user.password);

        user.save(err => {
            if (err) throw err;

            res.json({ success: true });
        });
    });
});

router.post("/login", (req, res) => {
    let id = req.body.id;
    let password = req.body.password;

    if (typeof password !== "string")
        // bcryptjs 안정성 검사
        return res.states(401).json({ error: "login fail", code: 1 });

    User.findOne({ id }, (err, user) => {
        if (err) throw err;
        if (!user)
            return res.status(401).json({ error: "not found user", code: 2 });
        if (!user.validateHash(password))
            return res
                .status(401)
                .json({ error: "not matching password", code: 3 });

        let session = req.session;
        session.user = {
            _id: user._id,
            name: user.name
        };
        return res.json({ success: true });
    });
});

router.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
    });
    return res.json({ success: true });
});

router.get("/clear", (req, res) => {
    User.deleteMany({}, err => {
        if (err) throw err;
        res.send("success");
    });
});

module.exports = router;

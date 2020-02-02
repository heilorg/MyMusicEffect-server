const express = require("express");
const router = express.Router();
const User = require("../models/user");

// GET
router.get("/test", (req, res) => {
    res.json({ data: "asd" });
});
router.get("/all", (req, res) => {
    User.find((err, users) => {
        if (err) throw err;
        res.json(users);
    });
});

// id -> _id(몽고디비 시스템적 아이디) , user_id -> 사용자가 지정한 아이디
router.get("/get/:id", (req, res) => {
    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) throw err;
        if (!user) return res.status(404).send({ error: "user not found" });
        res.json(user);
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
        return res.status(400).json({ err: "bad id", code: 1 });

    if (user.password.length < 4 || typeof user.password !== "string")
        return res.status(400).json({ err: "bad passwrod", code: 2 });

    let nameRegex = /^[a-zㄱ-ㅎㅏ-ㅣ가-힣]+$/;
    if (!nameRegex.test(user.id))
        return res.status(400).json({ err: "bad name", code: 3 });

    User.findOne({ id: user.id }, (err, findUser) => {
        if (err)
            return res.status(500).send({ err: "database failure", code: 0 });
        if (findUser)
            return res.status(409).send({ err: "need other id", code: 4 });

        user.password = user.generateHash(user.password);

        user.save(err => {
            if (err) throw err;

            res.json({ success: true });
        });
    });
});

router.post("/login", (req, res) => {
    let user = new User();
    user.id = req.body.id;
    user.password = req.body.password;
    user.name = req.body.name;
    user.song = [];

    user.save(err => {
        if (err) {
            console.log(err);
            res.json({ result: 0 });
            return;
        }

        res.json({ result: 1 });
    });
});

router.post("/logout", (req, res) => {
    res.json({ data: "logout" });
});

//PUT
router.put("/modify/:id", (req, res) => {
    User.upadte({ _id: req.parmas.id }, { $set: req.body }, (err, output) => {
        if (err) return res.status(500).send({ error: "database failure" });
        if (!output.n) return res.status(404).send({ error: "user not found" });

        console.log(output);
        res.json({ message: "user upload" });
    });
});

//DELETE
router.delete("/delete/:id", (req, res) => {
    User.remove({ _id: req.params.id }, (err, output) => {
        if (err) return res.status(500).send({ error: "database failure" });
        if (!output.n) return res.status(404).send({ error: "user not found" });

        res.json({ message: "user deleted" });
        res.status(204).end();
    });
});

module.exports = router;

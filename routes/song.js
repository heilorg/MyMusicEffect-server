const express = require("express");
const router = express.Router();
const Song = require("../models/song");
const mongoose = require("mongoose");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, req.session.user._id + file.originalname);
    }
});
const upload = multer({ storage });

// 추가
router.post("/add", upload.single("data"), (req, res) => {
    if (req.session.user === "undefined")
        return res.status(403).json({ error: "not logged in", code: 1 });

    let { title } = req.body;
    if (typeof title !== "string")
        return res.status(400).json({ error: "empty title", code: 2 });
    if (title === "")
        return res.status(400).json({ error: "empty title", code: 2 });

    if (req.file.mimetype !== "audio/mp3") {
        return res.status(400).json({ error: "not mp3 file", code: 3 });
    }

    let song = new Song({
        title,
        path: req.session.user._id + req.file.originalname,
        owner: req.session.user._id
    });
    song.save(err => {
        if (err) throw err;

        res.json({ success: true });
    });
});

// 나의 곡 전부 로드
router.get("/get", (req, res) => {
    if (req.session.user === "undefined")
        return res.status(403).json({ error: "not logged in", code: 1 });

    Song.find({ owner: req.session.user._id }).exec((err, songs) => {
        if (err) throw err;
        res.json(songs);
    });
});

// 삭제
router.delete("/delete/:song_id", (req, res) => {
    let song_id = req.params.song_id;
    if (!mongoose.Types.ObjectId.isValid(song_id))
        return res.json({ error: "invalid id", code: 1 });

    if (req.session.user === "undefined")
        return res.status(403).json({ error: "not logged in", code: 2 });

    Song.findById(song_id, (err, song) => {
        if (err) throw err;

        if (!song)
            return res.status(404).json({ error: "no resource", code: 3 });

        if (song.owner != req.session.user._id)
            return res
                .status(403)
                .json({ error: "permission failure", code: 4 });

        Song.remove({ _id: song_id }, err => {
            if (err) throw err;
            res.json({ success: true });
        });
    });
});

router.get("/clear", (req, res) => {
    Song.deleteMany({}, err => {
        if (err) throw err;
        res.send("success");
    });
});

module.exports = router;
